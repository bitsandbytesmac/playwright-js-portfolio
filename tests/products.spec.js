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

  test ('Test Case 18: View Category Products', async ({page}) => {
    //Verify that categories are visible on left side bar
    await expect(page.locator("//h2[normalize-space()='Category']")).toBeVisible();

    const categories = page.locator("//h4[@class='panel-title']");

    const count = await categories.count();
    expect (count).toBeGreaterThan(0);

    const listOfCategories = await categories.all();
    for (const category of listOfCategories){
	    await expect(category).toBeVisible();
	}

    //Click on 'Women' category
    await page.locator("//a[normalize-space()='Women']").click();

    //Click on any category link under 'Women' category, for example: Dress
    await page.locator("//a[@href='/category_products/1']").click();

    //Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
    await expect(page.locator("//h2[normalize-space()='Women - Dress Products']")).toHaveText('Women - Dress Products');
    console.log (await page.locator("//h2[normalize-space()='Women - Dress Products']").textContent());

    //On left side bar, click on any sub-category link of 'Men' category
    await page.locator("//a[normalize-space()='Men']").click();
    await page.locator("//a[normalize-space()='Tshirts']").click();

    //Verify that user is navigated to that category page
    await expect(page.locator("//h2[normalize-space()='Men - Tshirts Products']")).toHaveText('Men - Tshirts Products');
    console.log (await page.locator("//h2[normalize-space()='Men - Tshirts Products']").textContent());

  });

  test ('Test Case 19: View & Cart Brand Products', async ({page}) => {
    //Click on 'Products' button
    await page.locator("//a[@href='/products']").click();

    //Verify that Brands are visible on left side bar
	await expect(page.locator("//h2[normalize-space()='Brands']")).toHaveText('Brands');
	console.log (await page.locator("//h2[normalize-space()='Brands']").textContent());
	
	//Click on any brand name
	await page.locator("//a[@href='/brand_products/Polo']").click();
	
	//Verify that user is navigated to brand page and brand products are displayed
	await expect(page.locator("//h2[normalize-space()='Brand - Polo Products']")).toHaveText('Brand - Polo Products');
	
	const brandProducts = page.locator("//div[@class='single-products']");
	
	const countProducts = await brandProducts.count();
	expect (countProducts).toBeGreaterThan(0);
	
	const brandsProd = await brandProducts.all();
	for (const brandCount of brandsProd){
		await expect(brandCount).toBeVisible();
	}
	
	//On left side bar, click on any other brand link
	await page.locator("//a[@href='/brand_products/H&M']").click();
	
	//Verify that user is navigated to that brand page and can see products
    await expect(page.locator("//h2[normalize-space()='Brand - H&M Products']")).toHaveText('Brand - H&M Products');
    console.log (await page.locator("//h2[normalize-space()='Brand - H&M Products']").textContent());
  });

  test ('Test Case 21: Add review on product', async ({page}) => {
    //Click on 'Products' button
    await page.locator("//a[@href='/products']").click();

    //Verify user is navigated to ALL PRODUCTS page successfully
    await expect(page.locator("//h2[normalize-space()='All Products']")).toHaveText('All Products');
    console.log (await page.locator("//h2[normalize-space()='All Products']").textContent());

    //Click on 'View Product' button
    await page.locator("//a[@href='/product_details/1']").click();

    //Verify 'Write Your Review' is visible
    await expect(page.locator("//a[normalize-space()='Write Your Review']")).toHaveText('Write Your Review');
    console.log (await page.locator("//a[normalize-space()='Write Your Review']").textContent());

    //Enter name, email and review
    await page.locator("//input[@id='name']").fill('Mac Sunga');
    await page.locator("//input[@id='email']").fill('macsunga@example.com');
    await page.locator("//textarea[@id='review']").fill('This is a great product!');

    //Click 'Submit' button
    await page.locator("//button[@id='button-review']").click();

    //Verify success message 'Thank you for your review.'
    await expect(page.locator("//span[normalize-space()='Thank you for your review.']")).toHaveText('Thank you for your review.');
    console.log (await page.locator("//span[normalize-space()='Thank you for your review.']").textContent());

  });

  test ('Test Case 22: Verify Subscription in home page', async ({page}) => {
    //Scroll to bottom of page
    await page.locator("//h2[normalize-space()='recommended items']").scrollIntoViewIfNeeded();

    //Verify 'RECOMMENDED ITEMS' are visible
    await expect(page.locator("//h2[normalize-space()='recommended items']")).toHaveText('recommended items');
    console.log (await page.locator("//h2[normalize-space()='recommended items']").textContent());

    //Click on 'Add To Cart' on Recommended product
    await page.locator("(//a[@class='btn btn-default add-to-cart'][normalize-space()='Add to cart'])[69]").click();
    await page.waitForTimeout(500);

    //Click on 'View Cart' button
    await page.locator("//u[normalize-space()='View Cart']").click();

    //Verify that product is displayed in cart page
    await expect(page.locator("//a[normalize-space()='Blue Top']")).toBeVisible();
  });

});