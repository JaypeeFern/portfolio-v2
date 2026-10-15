# SEO and Search Analytics

This document describes the portfolio's current SEO and analytics setup, how
production indexing is protected, how to verify it, and which settings must be
updated when the deployment changes. It describes implementation and current
service configuration; it does not promise search ranking or traffic.

## Current production status

Verified on **2026-10-15**:

- The public homepage at `https://jpfernandez.dev/` returned HTTP 200 with
  `index, follow`, the canonical URL, Open Graph and Twitter metadata, and
  JSON-LD.
- [`robots.txt`](https://jpfernandez.dev/robots.txt) allows crawling and points
  to the canonical sitemap.
- [`sitemap.xml`](https://jpfernandez.dev/sitemap.xml) returned valid XML with
  the homepage as its only URL.
- Google Search Console's Domain property for `jpfernandez.dev` was verified
  through the domain provider. The submitted sitemap showed **Success** with
  one discovered page, and URL Inspection reported that the homepage was on
  Google and served over HTTPS.
- The GA4 Realtime report showed the `generate_lead` event after a successful
  contact submission.

Search Console's URL Inspection did not report rich-result enhancements. That
does not mean the page cannot be indexed: structured data describes the person,
website, projects, and experience, and does not guarantee a rich result.

## Production origin and indexing safeguards

The public route is Cloudflare Tunnel through Coolify's proxy to the Next.js
application on port 3000. The application only allows indexing when all of
these conditions hold:

1. `SEO_DEPLOYMENT_ENV` is `production`.
2. `SEO_TRUSTED_PROXY_ORIGIN` is exactly `true`.
3. Trusted ingress overwrites `X-SEO-Public-Origin` with the external request
   origin (scheme, hostname, and effective port), after stripping any
   visitor-supplied value.
4. The normalized header origin exactly matches `SITE_URL`.
5. Direct public access to the application origin is blocked.

The origin guard does not trust `Host`, `X-Forwarded-Host`, or
`X-Forwarded-Proto` by themselves. A missing, malformed, ambiguous, or
mismatched public-origin header fails closed. Preview and local environments
also remain non-indexable.

The VPS's public Docker ingress is additionally guarded for IPv4 and IPv6 by
the persistent `docker-ens3-ingress-guard.service`, which installs rules in
`DOCKER-USER`. The Cloudflare Tunnel route remains available. The service is
part of the trust boundary: do not remove or bypass it while
`SEO_TRUSTED_PROXY_ORIGIN=true` without replacing the direct-origin
restriction. See [Docker deployment](DOCKER_DEPLOYMENT.md) for Coolify and
Cloudflare routing requirements.

If the application is not indexable, it emits `noindex, nofollow` metadata and
an `X-Robots-Tag` header, disallows crawling in `robots.txt`, and returns an
empty sitemap. This prevents previews and requests through an untrusted origin
from creating conflicting canonical URLs or being indexed accidentally.

### Runtime environment settings

Set deployment values in Coolify. Keep actual environment files, verification
tokens, and credentials out of Git.

| Variable | Production setting | Purpose |
| --- | --- | --- |
| `SITE_URL` | `https://jpfernandez.dev` | Canonical HTTPS origin used by metadata, canonical links, Open Graph, JSON-LD, robots, and the sitemap. Must be an origin only, with no path or query. |
| `SEO_DEPLOYMENT_ENV` | `production` | Enables production behavior; preview builds should use `preview`. Local development defaults to `local` when omitted. |
| `SEO_TRUSTED_PROXY_ORIGIN` | `true` after ingress and direct-origin protections are in place | Opts into canonical-origin checking. Do not enable this on a deployment whose ingress does not overwrite the trusted header. |
| `GOOGLE_ANALYTICS_ID` | GA4 Measurement ID (`G-...`) | Optional. Loads GA4 only in production and only if the value has the expected format. The real value is held in Coolify. |
| `GOOGLE_SITE_VERIFICATION` | Not required while DNS ownership verification is active | Optional HTML-tag verification token for Search Console. The current Domain property is verified by DNS, so this code setting is not required for the active method. |
| `BING_SITE_VERIFICATION` | Optional | HTML-tag verification token for Bing Webmaster Tools; Bing setup is separate from Google Search Console. |

The Search Console DNS verification record is kept at the DNS provider. Do not
remove it while relying on DNS verification. Do not copy its value into this
document. The environment variable `GOOGLE_SITE_VERIFICATION` is a different
verification method; it is not the DNS TXT record and it is not the GA4
Measurement ID.

See [.env.production.example](../.env.production.example) for placeholder
configuration and [Docker deployment](DOCKER_DEPLOYMENT.md) for Coolify
runtime wiring. `portfolio.json` is the content source; do not put the
canonical domain or secrets there.

## Metadata, robots, sitemap, and structured data

The implementation lives in `src/app/layout.tsx`, `src/app/robots.ts`,
`src/app/sitemap.ts`, `src/lib/seo/config.ts`,
`src/lib/seo/structured-data.ts`, and `src/proxy.ts`.

- The page title, description, author, creator, publisher, social metadata,
  and JSON-LD content are derived from `portfolio.json`.
- `layout.tsx` emits the canonical URL, indexing directives, Open Graph
  metadata, and a large-image Twitter card. The Open Graph image is generated
  at `/opengraph-image`.
- JSON-LD uses a Schema.org graph for `Person` and `WebSite`, plus
  `CreativeWork` nodes for projects and `Organization` / `EmployeeRole` nodes
  for experiences when the corresponding portfolio entries contain usable
  data. JSON-LD serialization escapes HTML-sensitive characters.
- `robots.txt` allows crawling only for an indexable canonical request and
  advertises `https://jpfernandez.dev/sitemap.xml`.
- The XML sitemap currently contains only the homepage because it is the only
  public page route. Project and experience sections are not separate URLs.
  When adding a public route, give it route-specific title, description, and
  canonical metadata instead of inheriting the homepage values; add the route
  to the sitemap only if it should be indexed.
- The nonce-based Content Security Policy in `src/proxy.ts` permits the
  Google Tag and Analytics origins used by GA4.

## Google Search Console

The `jpfernandez.dev` Domain property is verified through DNS in Cloudflare.
Domain verification covers the property's subdomains and protocols. Keep the
verification DNS record present to retain ownership verification.

The current submitted sitemap is:

```text
https://jpfernandez.dev/sitemap.xml
```

Google Search Console showed the sitemap as successfully read with one
discovered page on 2026-10-15. A successful sitemap read means Google fetched
and parsed it; it does not guarantee every URL will be indexed. The homepage
was separately confirmed as indexed in URL Inspection.

To monitor or refresh indexing:

1. Use **Indexing → Sitemaps** to check the sitemap's latest fetch status and
   discovered URLs.
2. Use **URL Inspection** for `https://jpfernandez.dev/` to check Google's
   indexed view or run a live test after a significant change.
3. Request indexing for an individual updated URL only when useful. A request
   is a crawl request, not a guarantee of indexing; after a request, allow
   time for Google to recrawl.
4. Use the **Performance** report to follow impressions, clicks, queries, and
   average position as data accumulates.

Google's documentation: [Domain property ownership](https://support.google.com/webmasters/answer/9008080),
[Sitemaps report](https://support.google.com/webmasters/answer/7451001), and
[URL Inspection](https://support.google.com/webmasters/answer/9012289).

## Google Analytics 4 and lead measurement

The GA4 web stream is for `https://jpfernandez.dev`; Enhanced Measurement is
enabled. The app reads `GOOGLE_ANALYTICS_ID` at runtime and loads the tag only
for a production deployment. It uses Next.js `Script` and the gtag.js URL;
there are no Vercel Analytics packages in this setup. The production Content
Security Policy allows the required Google Tag and Analytics endpoints.

The contact form sends the GA4 event `generate_lead` only when `/api/contact`
returns `sent: true`, which means Resend accepted the message for sending. The
event sends no form fields or personal information. The honeypot path returns
`sent: false`, and API/Resend failures do not emit a lead event. In GA4,
`generate_lead` is marked as a key event.

To verify a lead event, use **Reports → Realtime** and inspect **Event count by
event name** (or **Key events by event name**) for `generate_lead`. Realtime
data typically appears within a few minutes; standard GA reports may take
24–48 hours to process. Avoid repeated production test submissions because a
successful test sends a real email through Resend.

Google's documentation: [Confirm data collection](https://support.google.com/analytics/answer/10201247),
[GA4 Realtime report](https://support.google.com/analytics/answer/9271392),
[About events](https://support.google.com/analytics/answer/9322688), and
[Data freshness](https://support.google.com/analytics/answer/11198161).

## Deployment verification checklist

After changing SEO configuration, proxy rules, or the public domain:

1. Confirm the Coolify application is healthy and the public domain still
   routes through Cloudflare Tunnel.
2. Fetch `https://jpfernandez.dev/` and confirm HTTP 200, the canonical link,
   `index, follow`, Open Graph metadata, and JSON-LD use the canonical origin.
3. Fetch `https://jpfernandez.dev/robots.txt` and confirm it allows crawling
   and names the canonical sitemap.
4. Fetch `https://jpfernandez.dev/sitemap.xml` and confirm it contains the
   homepage URL and no internal or preview hostnames.
5. Confirm direct access to published Docker ports on the VPS public IPv4 and
   IPv6 remains blocked, while the Cloudflare hostname works.
6. In Search Console, check the sitemap report and URL Inspection. In GA4,
   verify page-view events and, after a real successful form send, the
   `generate_lead` event.

The repository deployment check also lists the public health, sitemap, and
metadata checks in [Docker deployment](DOCKER_DEPLOYMENT.md#deploy-and-verify).
