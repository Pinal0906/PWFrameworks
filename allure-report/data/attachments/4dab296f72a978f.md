# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accountregistartion.spec.ts >> Account Registration
- Location: tests\accountregistartion.spec.ts:7:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/
Call log:
  - navigating to "http://localhost/opencart/", waiting until "load"

```

# Test source

```ts
  1  | import {test, expect, Locator, Page} from "@playwright/test"
  2  | import {TestConfig} from "../test.config"
  3  | import {HomePage} from "../pages/HomePage"
  4  | import {RegistrationPage} from "../pages/RegistrationPage"
  5  | import { RandomDataGenerator } from "../utils/randomdataGenerater"
  6  | 
  7  | test("Account Registration",async({page})=>{  
  8  | 
  9  | const config = new TestConfig()
> 10 | await page.goto(config.appUrl) // navigate to base url
     |            ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost/opencart/
  11 | 
  12 | // goto registration page
  13 | const homePage = new HomePage(page)
  14 | await homePage.clickOnMyAccount()
  15 | await homePage.clickOnRegister()  
  16 | 
  17 | // fill registration form
  18 | const registrationPage = new RegistrationPage(page)
  19 | const randomDataGenerator = new RandomDataGenerator()
  20 | await registrationPage.setFirstName(randomDataGenerator.getFirstName())
  21 | await registrationPage.setLastName(randomDataGenerator.getLastName())
  22 | await registrationPage.setEmail(randomDataGenerator.getEmail())
  23 | await registrationPage.setTelephone(randomDataGenerator.getPhoneNumber())
  24 | await registrationPage.setPassword(randomDataGenerator.getPassword())
  25 | await registrationPage.setConfirmPassword(randomDataGenerator.getConfirmPassword())
  26 | await registrationPage.selectPrivacyPolicy()
  27 | await registrationPage.clickContinue()         
  28 |     
  29 | // Vakidate the cofirmation message
  30 | const confirmationMessage = await registrationPage.getConfirmationMessage()
  31 | await expect(confirmationMessage).tocontain("Your Account Has Been Created!") 
  32 | 
  33 | await page.waitForTimeout(3000) // wait for 3 seconds before closing the browser     
  34 | })
```