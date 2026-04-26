import { test, expect } from "@playwright/test"
import { TestConfig } from "../test.config"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/LoginPage"
import { MyAccountPage } from "../pages/MyAccountPage"
import { DataProvider } from "../utils/dataProviders"


//Load JSON test data loginData.json
const jsonPath = "./testData/loginData.json"

const jsonTestData = DataProvider.getDataFromJSON(jsonPath)

for (const data of jsonTestData) {

    test(`Login with ${data.email} and ${data.password}`, async ({ page }) => {
        const testConfig = new TestConfig() // create an instance of TestConfig to access the properties
        await page.goto(testConfig.appUrl) // use the appUrl from TestConfig    

            const homePage = new HomePage(page)
            await homePage.isHomePageLoaded() // verify home page is loaded
            
            // Click on My Account first, then Login
            await homePage.clickOnMyAccount()
            await homePage.clickOnLogin()
        
            const loginPage = new LoginPage(page)
            await loginPage.login(data.email, data.password) // Use the email and password from the JSON test data to perform the login action    
        
            if (data.expectedResult.toLowerCase() === "success") {  
                const myAccountPage=new MyAccountPage(page) // Assuming you have a MyAccountPage class to represent the My Account page
                const isLoggedIn = await myAccountPage.isMyAccountPageExists() // Assuming you have a method to check if the user is logged in
                expect(isLoggedIn).toBeTruthy() // Assert that the user is logged in    
            } else {
                // Verify failed login by checking for the presence of an error message
                const errorMessage = await loginPage.getloginErrorMessage() // Assuming you have a method to get the login error message    
                expect(errorMessage).toBe("Warning: No match for E-Mail Address and/or Password.") // Assert that the error message is displayed    
            }

    })
}