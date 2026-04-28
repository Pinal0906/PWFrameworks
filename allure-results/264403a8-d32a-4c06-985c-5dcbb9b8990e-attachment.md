# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loginDataDriven.spec.ts >> Login with individualuser@example.com and test321
- Location: tests\loginDataDriven.spec.ts:16:9

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/
Call log:
  - navigating to "http://localhost/opencart/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | import { TestConfig } from "../test.config"
  3  | import { HomePage } from "../pages/HomePage"
  4  | import { LoginPage } from "../pages/LoginPage"
  5  | import { MyAccountPage } from "../pages/MyAccountPage"
  6  | import { DataProvider } from "../utils/dataProviders"
  7  | 
  8  | 
  9  | //Load JSON test data loginData.json
  10 | const jsonPath = "./testData/loginData.json"
  11 | 
  12 | const jsonTestData = DataProvider.getDataFromJSON(jsonPath)
  13 | 
  14 | for (const data of jsonTestData) {
  15 | 
  16 |     test(`Login with ${data.email} and ${data.password}`, async ({ page }) => {
  17 |         const testConfig = new TestConfig() // create an instance of TestConfig to access the properties
> 18 |         await page.goto(testConfig.appUrl) // use the appUrl from TestConfig    
     |                    ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/
  19 | 
  20 |             const homePage = new HomePage(page)
  21 |             await homePage.isHomePageLoaded() // verify home page is loaded
  22 |             
  23 |             // Click on My Account first, then Login
  24 |             await homePage.clickOnMyAccount()
  25 |             await homePage.clickOnLogin()
  26 |         
  27 |             const loginPage = new LoginPage(page)
  28 |             await loginPage.login(data.email, data.password) // Use the email and password from the JSON test data to perform the login action    
  29 |         
  30 |             if (data.expectedResult.toLowerCase() === "success") {  
  31 |                 const myAccountPage=new MyAccountPage(page) // Assuming you have a MyAccountPage class to represent the My Account page
  32 |                 const isLoggedIn = await myAccountPage.isMyAccountPageExists() // Assuming you have a method to check if the user is logged in
  33 |                 expect(isLoggedIn).toBeTruthy() // Assert that the user is logged in    
  34 |             } else {
  35 |                 // Verify failed login by checking for the presence of an error message
  36 |                 const errorMessage = await loginPage.getloginErrorMessage() // Assuming you have a method to get the login error message    
  37 |                 expect(errorMessage).toBe("Warning: No match for E-Mail Address and/or Password.") // Assert that the error message is displayed    
  38 |             }
  39 | 
  40 |     })
  41 | }
```