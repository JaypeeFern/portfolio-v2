# Production Docker deployment

This is the production-only Docker path for Portfolio V2. GitHub Actions builds
one Next.js standalone image, publishes it to GHCR under the full lowercase
Git commit SHA, verifies that image, then pins and triggers Coolify. Coolify
only pulls and runs the image. Local development remains the existing
**npm.cmd run dev** workflow.

The image runs Next.js on port 3000. Compose exposes that port only to Docker
networks; it has no host **ports** mapping. Coolify adds a resource with a
Domain to its Traefik network, and Traefik routes to the configured internal
port. The container keeps outbound network access for the Resend API.

## Image and revision checks

Production Compose uses this immutable image reference:

    ghcr.io/jaypeefern/portfolio-v2:$SOURCE_COMMIT

SOURCE_COMMIT is required by Compose and passed into the container. The image
also carries its build revision. Its entrypoint requires SOURCE_COMMIT to be
the same full lowercase 40-character SHA; an empty, short, mutable, or
mismatched value stops the container. There is no latest tag or fallback.

The GitHub Actions workflow runs these stages in order:

1. Build and push the image under github.sha. GitHub's automatic token gets
   packages: write for this job.
2. Authenticate to GHCR, inspect the full-SHA manifest, pull it, and compare
   its embedded OCI revision with github.sha.
3. On main only, update Coolify's source commit with the API, GET-verify that
   exact value, then POST its existing resource deploy webhook.

The deploy job needs the verification job, so image verification must finish
before Coolify receives a trigger. If all Coolify Actions secrets are absent,
the verified image remains available for a manual Coolify deploy. A partial
secret set fails the workflow.

## One-time GitHub configuration

The workflow uses the automatically provided GITHUB_TOKEN; no registry PAT is
needed in GitHub Actions. Its build job declares contents: read and packages:
write, and the verify job declares packages: read. Keep the GHCR package
connected to this repository so those permissions apply.

Add these repository Actions secrets to enable automatic deployment:

| Secret | Value |
| --- | --- |
| COOLIFY_WEBHOOK_URL | The HTTPS resource deploy webhook URL for this Coolify application |
| COOLIFY_TOKEN | The token accepted by that webhook |
| COOLIFY_API_TOKEN | A Coolify API token that can update and read this application's source commit |

Set all three together or leave all three unset. The workflow validates the
webhook URL, pins the application to github.sha, verifies the pin, and only
then calls the webhook.

If the GHCR package is private, create a GitHub token with read:packages and
grant its owner access to the package. Store it in Coolify as the build-time
variable GHCR_TOKEN. Use this Custom Build Command so the server logs in and
pulls only the already-published image:

    sh -c 'T=$(grep "^GHCR_TOKEN=" /artifacts/build-time.env | cut -d= -f2- | sed -e "s/^\"//" -e "s/\"$//"); echo "$T" | docker login ghcr.io -u JaypeeFern --password-stdin && docker compose -f docker-compose.yml pull'

Do not print or commit the token. If the package is public, Coolify does not
need GHCR credentials or the login command; keep the pull command.

## One-time Coolify configuration

1. Create an application from the Portfolio V2 repository using Docker Compose
   and the root docker-compose.yml. Select the production branch.
2. Make Coolify's source commit available during build so Compose receives the
   exact commit SHA as SOURCE_COMMIT. Do not add a user-owned SOURCE_COMMIT
   override.
3. Disable Coolify's Git auto-deploy. GitHub Actions is the deploy trigger so
   Coolify cannot deploy before the GHCR image has passed verification.
4. If the GHCR package is private, add the build-time GHCR_TOKEN and pull
   command above.
5. Add the runtime values from .env.production.example in Coolify. Mark
   RESEND_API_KEY as a secret.
6. Set Coolify's Domain to the chosen public HTTPS hostname and Ports Exposes
   to 3000. Leave Public Port empty. Coolify's Traefik proxy attaches the
   resource to its proxy network; Compose itself publishes no host port.
7. Configure the Cloudflare edge to strip any visitor-supplied
   X-SEO-Public-Origin header and replace it with the visitor-facing origin
   (scheme, hostname, and port). Keep the app origin reachable only through
   the trusted Cloudflare ingress. Then set SEO_TRUSTED_PROXY_ORIGIN=true.

SITE_URL must be the same canonical HTTPS origin as the Coolify Domain. The
application compares that value against the trusted X-SEO-Public-Origin
header. Traefik forwards the header to Next.js. If it is missing, malformed,
or different, the app safely emits noindex metadata, disallows robots, and
returns an empty sitemap. The app does not trust X-Forwarded-Host or
X-Forwarded-Proto on their own.

Copying .env.production.example into Coolify is only a starting point: replace
the example hostname and secret there, not in Git or the Docker image.
Production contact delivery also requires about.contactEmail in portfolio.json
and a verified sender domain in Resend. See docs/resend-setup.md.

## Deploy and verify

Push a change covered by the workflow paths to main. Wait for build, verify,
and deploy jobs to complete in that order. If deployment secrets are not set,
select the verified full SHA in Coolify and deploy manually.

In Coolify, confirm the resource is healthy and inspect its container to
verify it listens on 3000 with no published host port. Through the public
hostname, check:

- The homepage returns 200 and its canonical and Open Graph metadata use
  SITE_URL.
- /robots.txt allows indexing and references the canonical /sitemap.xml.
- /sitemap.xml contains the homepage at the canonical hostname.
- /api/contact accepts the contact form request. Actual delivery requires the
  Resend secret and a configured contact address.
- A local image requested through /_next/image is optimized successfully.

If the trusted-origin rule is not configured yet, robots and sitemap remain
deliberately noindex/empty until it is.

## Rollback

1. Identify a prior full lowercase 40-character commit SHA and confirm its
   portfolio-v2 image exists in GHCR.
2. In Coolify, select that exact source commit (or its prior successful
   deployment) and redeploy.
3. Confirm Compose receives that SHA and the container starts. Its entrypoint
   rejects any image whose embedded revision differs from SOURCE_COMMIT.
4. To return to the current release, select its full SHA and redeploy. Never
   clear SOURCE_COMMIT or replace it with latest.
