# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Login with valid credentials
- Location: tests\login.spec.ts:22:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/
Call log:
  - navigating to "http://localhost/opencart/", waiting until "load"

```

# Test source

```ts
  1  | import {test, expect} from "@playwright/test"
  2  | import {TestConfig} from "../test.config"
  3  | import {HomePage} from "../pages/HomePage"
  4  | import {LoginPage} from "../pages/LoginPage"
  5  | 
  6  | let homePage: HomePage
  7  | let loginPage: LoginPage
  8  | 
  9  | test.beforeEach("Navigate to Home Page",async({page})=>{
  10 |     const config = new TestConfig()
> 11 |     await page.goto(config.appUrl) // navigate to base url
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/
  12 |     homePage = new HomePage(page)
  13 |     await homePage.isHomePageLoaded() // verify home page is loaded
  14 |     loginPage = new LoginPage(page)
  15 | })
  16 | 
  17 | test.afterEach("Close Browser",async({page})=>{
  18 |     await page.waitForTimeout(3000) // wait for 3 seconds before closing the browser      
  19 |     await page.close() // close the browser after each test
  20 | })
  21 | 
  22 | test("Login with valid credentials",async({page})=>{  
  23 | 
  24 | // goto login page
  25 | await homePage.clickOnMyAccount()
  26 | await homePage.clickOnLogin()  
  27 | 
  28 | // login with valid credentials
  29 | await loginPage.setEmail("test@example.com")
  30 | await loginPage.setPassword("Test@123")
  31 | await loginPage.clickLogin()          
  32 |     
  33 | // Validate the user is logged in (my account page should be displayed)
  34 | await expect(page).toHaveURL(/.*account/)
  35 | 
  36 | })
```