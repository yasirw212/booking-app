import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:8081"

test('Should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("awilliams@gmail.com")
  await page.locator("[name=password]").fill("Password123")

  await page.getByRole("button", {name: "Login"}).click()

  await expect(page.getByText("Sign In Successful!")).toBeVisible();
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();
});

test("Should allow user to register", async ({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 10000}@gmail.com`
  await page.goto(UI_URL);

  await page.getByRole("link", {name: "Sign In"}).click();

  await page.getByRole("link", {name: "Create an account here"}).click();

  await expect(page.getByRole("heading", {name: "Create an Account"})).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName")
  await page.locator("[name=lastName]").fill("test_lastName")
  await page.locator("[name=email]").fill(testEmail)
  await page.locator("[name=password]").fill("test_password")
  await page.locator("[name=confirmPassword]").fill("test_password")

  await page.getByRole("button", {name: "Create Account"}).click();

  await expect(page.getByText("Registration Successful!")).toBeVisible();
  await expect(page.getByRole("link", {name: "My bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();
})



