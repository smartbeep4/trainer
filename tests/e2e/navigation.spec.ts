import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("homepage loads correctly", async ({ page }) => {
    await page.goto("/");

    // Check title
    await expect(page).toHaveTitle(/Developer of Tomorrow/);

    // Check hero section
    await expect(
      page.getByRole("heading", { name: /Developer of Tomorrow/i })
    ).toBeVisible();

    // Check start learning button exists
    await expect(
      page.getByRole("link", { name: /Start Learning/i })
    ).toBeVisible();
  });

  test("can navigate to module 1", async ({ page }) => {
    await page.goto("/");

    // Click start learning
    await page
      .getByRole("link", { name: /Start Learning/i })
      .first()
      .click();

    // Should be on module 1 page
    await expect(page).toHaveURL(/\/module\/developer-mental-model/);

    // Check module title is visible
    await expect(
      page.getByRole("heading", { name: /Developer's Mental Model/i })
    ).toBeVisible();
  });

  test("syllabus section shows all parts", async ({ page }) => {
    await page.goto("/#syllabus");

    // Check all 4 parts are visible
    await expect(page.getByText(/Part 1: Foundations/i)).toBeVisible();
    await expect(page.getByText(/Part 2: AI\/ML Deep Dive/i)).toBeVisible();
    await expect(page.getByText(/Part 3: Safe Use & Agentic/i)).toBeVisible();
    await expect(page.getByText(/Part 4: Capstone & Advanced/i)).toBeVisible();
  });

  test("header navigation works", async ({ page }) => {
    await page.goto("/module/developer-mental-model");

    // Click home link (logo)
    await page
      .getByRole("link", { name: /Developer of Tomorrow/i })
      .first()
      .click();

    // Should be back on homepage
    await expect(page).toHaveURL("/");
  });

  test("breadcrumbs navigation works", async ({ page }) => {
    await page.goto("/module/developer-mental-model");

    // Check breadcrumbs are visible
    await expect(
      page.getByRole("navigation", { name: /breadcrumb/i })
    ).toBeVisible();

    // Click home breadcrumb
    await page.getByRole("link", { name: "Home" }).click();

    // Should be back on homepage
    await expect(page).toHaveURL("/");
  });
});

test.describe("Dark Mode", () => {
  test("theme toggle works", async ({ page }) => {
    await page.goto("/");

    // Find theme toggle button
    const themeButton = page.getByRole("button", { name: /theme/i });
    await expect(themeButton).toBeVisible();

    // Click to open dropdown
    await themeButton.click();

    // Should see theme options
    await expect(page.getByRole("menuitem", { name: /Dark/i })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /Light/i })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /System/i })).toBeVisible();
  });

  test("dark mode persists", async ({ page }) => {
    await page.goto("/");

    // Open theme dropdown and select dark
    await page.getByRole("button", { name: /theme/i }).click();
    await page.getByRole("menuitem", { name: /Dark/i }).click();

    // Check if dark class is applied
    await expect(page.locator("html")).toHaveClass(/dark/);

    // Reload page
    await page.reload();

    // Dark mode should persist
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});

test.describe("Quiz Functionality", () => {
  test("quiz component renders", async ({ page }) => {
    await page.goto("/module/developer-mental-model");

    // Scroll to quiz section
    await page.getByText("Knowledge Check").scrollIntoViewIfNeeded();

    // Check quiz is visible
    await expect(page.getByText(/Question 1 of/i)).toBeVisible();
  });

  test("can answer quiz questions", async ({ page }) => {
    await page.goto("/module/developer-mental-model");

    // Scroll to quiz
    await page.getByText("Knowledge Check").scrollIntoViewIfNeeded();

    // Select an answer (the correct one)
    await page.getByText(/They predict the most likely next tokens/i).click();

    // Click check answer
    await page.getByRole("button", { name: /Check Answer/i }).click();

    // Should see explanation
    await expect(
      page.getByText(/Correct!/i).or(page.getByText(/Not quite right/i))
    ).toBeVisible();
  });
});

test.describe("Progress Tracking", () => {
  test("progress page loads", async ({ page }) => {
    await page.goto("/progress");

    // Check page title
    await expect(
      page.getByRole("heading", { name: /My Progress/i })
    ).toBeVisible();

    // Check course progress dashboard is visible
    await expect(page.getByText(/Course Progress/i)).toBeVisible();
  });

  test("mark complete button exists", async ({ page }) => {
    await page.goto("/module/developer-mental-model");

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check mark complete button exists
    await expect(
      page.getByRole("button", { name: /Mark Complete/i })
    ).toBeVisible();
  });
});

test.describe("Responsive Design", () => {
  test("mobile menu button visible on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Mobile menu button should be visible
    await expect(
      page.getByRole("button", { name: /Open menu/i })
    ).toBeVisible();
  });

  test("sidebar hidden on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/module/developer-mental-model");

    // Sidebar should not be visible (it's hidden with CSS)
    const sidebar = page.locator("aside").first();
    await expect(sidebar).toBeHidden();
  });

  test("content readable at 375px width", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/module/developer-mental-model");

    // Main content should be visible
    await expect(page.getByRole("article")).toBeVisible();

    // Module title should be visible
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("404 Page", () => {
  test("404 page displays for invalid routes", async ({ page }) => {
    await page.goto("/nonexistent-page");

    // Should show 404 content
    await expect(page.getByText(/Page Not Found/i)).toBeVisible();

    // Should have links to homepage
    await expect(
      page.getByRole("link", { name: /Go to Homepage/i })
    ).toBeVisible();
  });
});
