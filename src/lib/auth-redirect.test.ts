import { describe, expect, it } from "vitest";
import { resolveAuthRedirectUrl } from "./auth-redirect";

const baseUrl = "http://localhost:3000";
const appUrl = "http://127.0.0.1:3000";

describe("resolveAuthRedirectUrl", () => {
  it("resolves relative redirects against the app URL", () => {
    expect(
      resolveAuthRedirectUrl({
        url: "/dashboard",
        baseUrl,
        appUrl,
      }),
    ).toBe("http://127.0.0.1:3000/dashboard");
  });

  it("normalizes localhost redirects to the configured app URL", () => {
    expect(
      resolveAuthRedirectUrl({
        url: "http://localhost:3000/dashboard?tab=settings",
        baseUrl,
        appUrl,
      }),
    ).toBe("http://127.0.0.1:3000/dashboard?tab=settings");
  });

  it("rejects external redirects", () => {
    expect(
      resolveAuthRedirectUrl({
        url: "https://example.com/phishing",
        baseUrl,
        appUrl,
      }),
    ).toBe("http://127.0.0.1:3000");
  });
});
