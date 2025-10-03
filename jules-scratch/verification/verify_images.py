from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the blog index page
    page.goto("http://localhost:4321/blog")
    page.wait_for_load_state('networkidle')
    page.screenshot(path="jules-scratch/verification/blog-index.png")

    # Navigate directly to the blog post
    page.goto("http://localhost:4321/blog/new-astro-blog/")

    # Wait for the heading to be visible to ensure the page has loaded
    heading = page.get_by_role("heading", name="New Year, New Blog")
    expect(heading).to_be_visible()

    # Wait for network to be idle before taking screenshot
    page.wait_for_load_state('networkidle')

    page.screenshot(path="jules-scratch/verification/blog-post.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)