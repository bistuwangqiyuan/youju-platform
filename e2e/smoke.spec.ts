import { test, expect } from "@playwright/test";

test.describe("deploy smoke", () => {
  test("home page loads with title and main content", async ({ page }) => {
    const res = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(res?.ok()).toBeTruthy();
    await expect(page.locator("header")).toBeVisible();
    await expect(page.getByRole("link", { name: /登录|Login/i })).toBeVisible();
  });

  test("search page responds", async ({ page }) => {
    const res = await page.goto("/search", { waitUntil: "domcontentloaded" });
    expect(res?.ok()).toBeTruthy();
    await expect(page.locator("body")).toBeVisible();
  });

  test("login page responds", async ({ page }) => {
    const res = await page.goto("/login", { waitUntil: "domcontentloaded" });
    expect(res?.ok()).toBeTruthy();
    await expect(page.locator("body")).toBeVisible();
  });
});
