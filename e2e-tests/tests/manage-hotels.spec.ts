import { test, expect } from "@playwright/test";
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

test("should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}/add-hotel`)

    await page.locator( `[name="name"]`).fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test Country");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("This is a description for the Test Hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    await page.selectOption('select[name="starRating"]', "3");
    await page.getByText("Budget").click();
    await page.getByLabel("Free Wifi").check();
    await page.selectOption('select[name="adultCount"]', "2")
    await page.selectOption('select[name="childCount"]', "4")

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "hotel1.jpeg"),
        path.join(__dirname, "files", "hotel2.jpeg"),
        path.join(__dirname, "files", "hotel3.jpeg")
    ])

    await page.getByRole("button", { name: "Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
});