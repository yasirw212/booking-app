import { test, expect } from "@playwright/test";
import exp from "constants";
import path from "path";

const UI_URL = "http://localhost:8081"

test.beforeEach(async({page}) => {
    await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("awilliams@gmail.com")
  await page.locator("[name=password]").fill("Password123")

  await page.getByRole("button", {name: "Login"}).click()

  await expect(page.getByText("Sign In Successful!")).toBeVisible();
})

test("Should show hotel search results", async({page}) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Test City")
    await page.getByRole("button", {name: "Search"}).click()

    await expect(page.getByText("Hotels found in Test City")).toBeVisible();
    await expect(page.getByText("Test Hotel")).toBeVisible();
})

test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Test City")
  await page.getByRole("button", {name: "Search"}).click()
 
  await page.getByText("Test Hotel").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", {name: "Book now"})).toBeVisible();

});