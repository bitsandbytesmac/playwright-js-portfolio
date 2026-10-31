// @ts-check
import { test, expect } from '@playwright/test';

test('Test Case 1: Register User', async ({ page }) => {
  
  //Launch browser
  await page.goto('http://automationexercise.com');

  //Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);

  //Navigate to url 'http://automationexercise.com'
  await page.goto('http://automationexercise.com');

  //Verify that home page is visible successfully
  await expect(page.locator("(//a[normalize-space()='Home'])[1]")).toHaveText('Home');

  //Click on 'Signup / Login' button
  await page.locator("a[href='/login']").click();

  //Verify 'New User Signup!' is visible
  await expect(page.locator("//h2[normalize-space()='New User Signup!']")).toHaveText('New User Signup!');
  console.log (await page.locator("//h2[normalize-space()='New User Signup!']").textContent());

  //Enter name and email address
  await page.locator("input[placeholder='Name']").fill("Mac");
  await page.locator("input[data-qa='signup-email']").fill("mac.sunga@test.com");

  //Click 'Signup' button
  await page.locator("button[data-qa='signup-button']").click();
  

  //Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await expect(page.locator("(//h2[@class='title text-center'])[1]")).toHaveText('Enter Account Information');
  console.log (await page.locator("(//h2[@class='title text-center'])[1]").textContent());

  //Fill details: Title, Name, Email, Password, Date of birth
  await page.locator("//input[@id='id_gender1']").click();
  await page.locator("//input[@id='password']").fill('Test123!');
  await page.locator("//select[@id='days']").selectOption('1');
  await page.locator("//select[@id='months']").selectOption('February');
  await page.locator("//select[@id='years']").selectOption('1996');

  //Select checkbox 'Sign up for our newsletter!'
  await page.locator("//input[@id='optin']").click();

  //Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  await page.locator("//input[@id='first_name']").fill('Mac');
  await page.locator("//input[@id='last_name']").fill('Sunga');
  await page.locator("//input[@id='company']").fill('Playwright');
  await page.locator("//input[@id='address1']").fill('Imson Street, 123, Playwright');
  await page.locator("//input[@id='address2']").fill('Playwright');
  await page.locator("//select[@id='country']").selectOption('Singapore');
  await page.locator("//input[@id='state']").fill('Test');
  await page.locator("//input[@id='city']").fill('San Jose');
  await page.locator("//input[@id='zipcode']").fill('12345');
  await page.locator("//input[@id='mobile_number']").fill('01236456789');

  //Click 'Create Account button'
  await page.locator("//button[@data-qa='create-account']").click();

  //Verify that 'ACCOUNT CREATED!' is visible
  await expect(page.locator("//h2[@data-qa='account-created']")).toHaveText('Account Created!');
  console.log (await page.locator("//h2[@data-qa='account-created']").textContent());

  //Click 'Continue' button
  await page.locator("//a[@data-qa='continue-button']").click();

  //Verify that 'Logged in as username' is visible
  await expect(page.locator("//a[.//i[@class='fa fa-user']]")).toHaveText('Logged in as Mac');

  //Click 'Delete Account' button
  await page.locator("a[href='/delete_account']").click();

  //Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  await expect(page.locator("//h2[@data-qa='account-deleted']")).toHaveText('Account Deleted!');
  console.log (await page.locator("//h2[@data-qa='account-deleted']").textContent());

  //CLick 'Continue' button
  await page.locator("//a[@data-qa='continue-button']").click();
});
