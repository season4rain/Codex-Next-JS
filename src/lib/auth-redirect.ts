const LOCALHOST_ORIGIN = "http://localhost:3000";

export function resolveAuthRedirectUrl({
  url,
  baseUrl,
  appUrl = process.env.AUTH_URL ?? baseUrl,
}: {
  url: string;
  baseUrl: string;
  appUrl?: string;
}) {
  if (url.startsWith("/")) {
    return `${appUrl}${url}`;
  }

  const redirectUrl = new URL(url);
  const currentBaseUrl = new URL(baseUrl);

  if (
    redirectUrl.origin === currentBaseUrl.origin ||
    redirectUrl.origin === LOCALHOST_ORIGIN
  ) {
    return `${appUrl}${redirectUrl.pathname}${redirectUrl.search}`;
  }

  return appUrl;
}
