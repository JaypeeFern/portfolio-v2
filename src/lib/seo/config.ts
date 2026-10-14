export type SeoDeploymentEnvironment = "production" | "preview" | "local";

export interface SeoConfig {
  deploymentEnvironment: SeoDeploymentEnvironment;
  isCanonicalHost: boolean;
  isIndexable: boolean;
  siteUrl: string;
}

const LOCAL_SITE_URL = "http://localhost:3000";
const VALID_DEPLOYMENT_ENVIRONMENTS: SeoDeploymentEnvironment[] = [
  "production",
  "preview",
  "local",
];

function getDeploymentEnvironment(
  environment: NodeJS.ProcessEnv,
): SeoDeploymentEnvironment {
  const configuredEnvironment = environment.SEO_DEPLOYMENT_ENV?.trim();

  if (!configuredEnvironment) {
    if (environment.NODE_ENV === "production") {
      throw new Error(
        "SEO_DEPLOYMENT_ENV must be set to production or preview for production builds. Set it explicitly to production, preview, or local.",
      );
    }

    return "local";
  }

  if (
    !VALID_DEPLOYMENT_ENVIRONMENTS.includes(
      configuredEnvironment as SeoDeploymentEnvironment,
    )
  ) {
    throw new Error(
      "SEO_DEPLOYMENT_ENV must be one of: " +
        VALID_DEPLOYMENT_ENVIRONMENTS.join(", ") +
        '. Received "' +
        configuredEnvironment +
        '".',
    );
  }

  const deploymentEnvironment =
    configuredEnvironment as SeoDeploymentEnvironment;

  if (
    environment.NODE_ENV === "production" &&
    deploymentEnvironment === "local"
  ) {
    throw new Error(
      'SEO_DEPLOYMENT_ENV="local" cannot be used for a production build. Set it to "preview" or "production".',
    );
  }

  return deploymentEnvironment;
}

function normalizeSiteUrl(
  configuredUrl: string | undefined,
  deploymentEnvironment: SeoDeploymentEnvironment,
): string {
  const trimmedUrl = configuredUrl?.trim();

  if (!trimmedUrl) {
    if (deploymentEnvironment === "production") {
      throw new Error(
        "SITE_URL is required when SEO_DEPLOYMENT_ENV=production. Set it to the canonical HTTPS origin, such as https://your-domain.example.",
      );
    }

    return LOCAL_SITE_URL;
  }

  let url: URL;

  try {
    url = new URL(trimmedUrl);
  } catch {
    throw new Error(
      'SITE_URL must be an absolute HTTP or HTTPS origin, such as https://your-domain.example. Received "' +
        trimmedUrl +
        '".',
    );
  }

  if (
    (url.protocol !== "https:" && url.protocol !== "http:") ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      'SITE_URL must be an HTTP or HTTPS origin without credentials, a path, query, or fragment. Received "' +
        trimmedUrl +
        '".',
    );
  }

  if (deploymentEnvironment === "production" && url.protocol !== "https:") {
    throw new Error(
      "SITE_URL must use HTTPS when SEO_DEPLOYMENT_ENV=production.",
    );
  }

  return url.origin;
}

function matchesCanonicalHostname(
  requestHostname: string | null | undefined,
  siteUrl: string,
): boolean {
  if (requestHostname === undefined) {
    return true;
  }

  const trimmedHostname = requestHostname?.trim();
  if (!trimmedHostname) {
    return false;
  }

  let requestUrl: URL;

  try {
    requestUrl = new URL("http://" + trimmedHostname);
  } catch {
    return false;
  }

  if (
    requestUrl.username ||
    requestUrl.password ||
    requestUrl.pathname !== "/" ||
    requestUrl.search ||
    requestUrl.hash
  ) {
    return false;
  }

  return (
    requestUrl.hostname.toLowerCase() ===
    new URL(siteUrl).hostname.toLowerCase()
  );
}

export function getSeoConfig(
  environment: NodeJS.ProcessEnv = process.env,
  requestHostname?: string | null,
): SeoConfig {
  const deploymentEnvironment = getDeploymentEnvironment(environment);
  const siteUrl = normalizeSiteUrl(
    environment.SITE_URL,
    deploymentEnvironment,
  );
  const isCanonicalHost = matchesCanonicalHostname(
    requestHostname,
    siteUrl,
  );

  return {
    deploymentEnvironment,
    isCanonicalHost,
    isIndexable:
      deploymentEnvironment === "production" && isCanonicalHost,
    siteUrl,
  };
}
