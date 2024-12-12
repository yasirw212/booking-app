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

test("Should display hotels", async ({ page }) => { 
    await page.goto(`${UI_URL}/my-hotels`);

    await expect(page.getByText("Test Hotel")).toBeVisible();
    await expect(page.getByText("Lorem Ipsum dolor sit amet")).toBeVisible();
    await expect(page.getByText("Test City, Test Country")).toBeVisible();
    await expect(page.getByText("Budget")).toBeVisible();
    await expect(page.getByText(("$100 per night"))).toBeVisible();
    await expect(page.getByText("2 adults, 4 children")).toBeVisible();
    await expect(page.getByText("3 Star Rating")).toBeVisible();

    await expect(page.getByRole("link", {name: "View Details"}).first()).toBeVisible();
    await expect(page.getByRole("link", {name: "Add Hotel"})).toBeVisible();

});


test("should edit hotel",  async ({ page }) => {
    await page.goto(`${UI_URL}/my-hotels`)

    await page.getByRole("link", { name: "View Details"}).first().click();

    await page.waitForSelector('[name="name"]', { state: "attached"})
    await expect(page.locator('[name="name"]')).toHaveValue('Test Hotel')
    await page.locator('[name="name"]').fill("Test Hotel UPDATED")
    await page.getByRole("button", {name: "Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();

    await page.reload();

    await expect(page.locator('[name="name"]')).toHaveValue("Test Hotel UPDATED");
    await page.locator('[name="name"]').fill("Test Hotel");
    await page.getByRole("button", {name: "Save"}).click();
})