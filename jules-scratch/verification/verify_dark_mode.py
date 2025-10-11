from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # 1. Navigate to the homepage.
    page.goto("http://localhost:4321")

    # 2. Take a screenshot of the initial (light) theme.
    page.screenshot(path="jules-scratch/verification/01-light-mode.png")

    # Check that html element does not have 'dark' class
    expect(page.locator("html")).not_to_have_class("dark")

    # 3. Find the theme toggle button and click it.
    theme_toggle_button = page.locator("#theme-toggle")
    theme_toggle_button.click()

    # 4. Take a screenshot of the dark theme.
    # Wait for the class to be applied
    expect(page.locator("html")).to_have_class("dark")
    page.screenshot(path="jules-scratch/verification/02-dark-mode.png")

    # 5. Click the theme toggle button again.
    theme_toggle_button.click()

    # 6. Take a screenshot to verify it goes back to light mode.
    expect(page.locator("html")).not_to_have_class("dark")
    page.screenshot(path="jules-scratch/verification/03-light-mode-restored.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)