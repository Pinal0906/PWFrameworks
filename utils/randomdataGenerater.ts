import { faker } from "@faker-js/faker"

export class RandomDataGenerator {
   static getFirstName() {
        return faker.person.firstName()
    }   
    static getLastName() {  
        return faker.person.lastName()
    }
    static getEmail() {
        return faker.internet.email()
    }   
    static getPhoneNumber() {
        return faker.phone.number()
    }
    static getAddress() {
        return faker.location.streetAddress()
    }
    static getCity() {
        return faker.location.city()
    }
    static randomPassword() {   
        return faker.internet.password()
    }
    static getPassword() {
        return this.randomPassword()
    }
    static getConfirmPassword() {
        return this.getPassword()
    }
    static get confirmationMessage() {
        return "Your Account Has Been Created!"
    }   
}