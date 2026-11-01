import {test, expect} from '@playwright/test';

test .describe('Products Page Tests', () => {

  // This runs automatically before EACH test below it
  test.beforeEach(async ({ page }) => {
    // Block common ad/tracking networks to prevent ad overlays from breaking tests
    await page.route('**/*', (route) => {
        const url = route.request().url();
        if (
            url.includes('googleads') || 
            url.includes('doubleclick') || 
            url.includes('adsbygoogle') || 
            url.includes('ezoic') ||
            url.includes('pagead')
        ) {
            return route.abort();
        }
        return route.continue();
    });

    //Navigate to url 'http://automationexercise.com'
    await page.goto('http://automationexercise.com');

    //Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Automation Exercise/);

    //Verify that home page is visible successfully
    await expect(page.locator("(//a[normalize-space()='Home'])[1]")).toHaveText('Home');
  });

  test ('Test Case 8: Verify All Products and product detail page', async ({page}) => {
    //Click on 'Products' button
    await page.locator("//a[@href='/products']").click();

    //Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page.locator("//h2[normalize-space()='All Products']")).toHaveText('All Products');
    console.log (await page.locator("//h2[normalize-space()='All Products']").textContent());

    //The products list is visible
    const divLocators = page.locator("(//div[@class='single-products'])");

    const allItems = await divLocators.allTextContents();
    console.log(allItems);

    //Click on 'View Product' of first product
    await page.locator("//a[@href='/product_details/1']").click();

    //User is landed to product detail page
    await expect(page.locator("//div[@class='product-information']")).toBeVisible();

    //Verify that detail is visible: product name, category, price, availability, condition, brand
    await expect(page.locator("//h2[normalize-space()='Blue Top']")).toBeVisible();
    await expect(page.locator("//p[normalize-space()='Category: Women > Tops']")).toBeVisible();
    await expect(page.locator("//b[normalize-space()='Availability:']")).toBeVisible();
    await expect(page.locator("//b[normalize-space()='Condition:']")).toBeVisible();
    await expect(page.locator("//b[normalize-space()='Brand:']")).toBeVisible();
  });

  test ('Test Case 9: Search Product', async ({page}) =>{
    //Click on 'Products' button
    await page.locator("//a[@href='/products']").click();

    //Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page.locator("//h2[normalize-space()='All Products']")).toHaveText('All Products');
    console.log (await page.locator("//h2[normalize-space()='All Products']").textContent());


    //Enter product name in search input and click search button
    await page.locator("//input[@id='search_product']").fill('Blue Top');

    await page.locator("//button[@id='submit_search']").click();

    //Verify 'SEARCHED PRODUCTS' is visible
    await expect(page.locator("//h2[normalize-space()='Searched Products']")).toBeVisible();
    
    //Verify all the products related to search are visible
    const products = page.locator("//div[@class='single-products']");

    const count = await products.count();
    expect (count).toBeGreaterThan(0);

    const searchProducts = await products.all();
    for (const product of searchProducts) {
        await expect(product).toBeVisible();
    }
  });

});