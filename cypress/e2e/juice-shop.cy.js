import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { RegisterPage } from "../pageObjects/RegistrationPage";
import { BasketPage } from "../pageObjects/BasketPage";
import { SelectAddressPage } from "../pageObjects/SelectAddressPage";
import { DeliveryMethodPage } from "../pageObjects/DeliveryMethodPage";
import { PaymentOptionsPage } from "../pageObjects/PaymentOptionsPage";
import { OrderSummaryPage } from "../pageObjects/OrderSummaryPage";
import { OrderCompletionPage } from "../pageObjects/OrderCompletionPage";
import { CreateAddressPage } from "../pageObjects/CreateAddressPage";
import { SavedAddressesPage } from "../pageObjects/SavedAddressesPage";
import { SavedPaymentMethodsPage } from "../pageObjects/SavedPaymentMethodsPage";

describe("Juice-shop scenarios", () => {
  context("Without auto login", () => {
    beforeEach(() => {
      HomePage.visit();
      HomePage.dismissButton.click();
      HomePage.meWantItButton.click();
    });

    it("Login", () => {
      // Click Account button
      HomePage.accountButton.click();
      // Click Login button
      HomePage.loginButton.click();
      // Set email value to "demo"
      LoginPage.emailInput.type("demo");
      // Set password value to "demo"
      LoginPage.passwordInput.type("demo");
      // Click Log in
      LoginPage.loginButton.click();
      // Click Account button
      HomePage.accountButton.click();
      // Validate that "demo" account name appears in the menu section
      HomePage.accountName.should("contain.text", "demo");
    });

    it("Registration", () => {
      // Click Account button
      HomePage.accountButton.click();
      // Login button
      HomePage.loginButton.click();
      // Click "Not yet a customer?"
      LoginPage.toRegisterLink.click();
      // Find - how to generate random number in JS
      // Use that number to genarate unique email address, e.g.: email_7584@ebox.com
      const email = `email_${Math.round(Math.random()*10000)}@ebox.com`;
      const password = `password${Math.round(Math.random()*10000)}`;
      // Save that email address to some variable
      RegisterPage.emailInput.type(email);
      // Fill in password field and repeat password field with same password
      RegisterPage.passwordInput.type(password);
      RegisterPage.repPasswordInput.type(password);
      // Click on Security Question menu
      RegisterPage.securityContainer.click();
      // Select  "Name of your favorite pet?"
      RegisterPage.petOption.click();
      // Fill in answer
      RegisterPage.securityAnswer.type("doesn't exist");
      // Click Register button
      RegisterPage.registerButton.click();
      // Set email value to previously created email
      LoginPage.emailInput.type(email);
      // Set password value to previously used password value
      LoginPage.passwordInput.type(password);
      // Click login button
      LoginPage.loginButton.click();
      // Click Account button
      HomePage.accountButton.click();
      // Validate that account name (with previously created email address) appears in the menu section
      HomePage.accountName.should("contain.text", ` ${email} `);
    });
  });

  context("With auto login", () => {
    beforeEach(() => {
      cy.login("demo", "demo");
      HomePage.visit();
    });


    it("Search and validate Lemon", () => {
      // Click on search icon
      HomePage.searchQuery.click();
      // Search for Lemon
      HomePage.searchQueryText.type("Lemon{enter}");
      // Select a product card - Lemon Juice (500ml)
      HomePage.selectCards.filter(":contains('Lemon Juice (500ml)')").click();
      // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.dialogContainer.should("contain.text", 'Sour but full of vitamins.');
    });


    // Create scenario - Search 500ml and validate Lemon, while having multiple cards
    it('Search for 500ml, select Lemon Juice card, and validate description', () => {
      // Click on search icon
      HomePage.searchQuery.click();
      // Search for 500ml
      HomePage.searchQueryText.type("500ml{enter}");
      // Select a product card - Lemon Juice (500ml)
      HomePage.selectCards.filter(":contains('Lemon Juice (500ml)')").click();
      // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.dialogContainer.should("contain.text", 'Sour but full of vitamins.');
    });


    // Create scenario - Search 500ml and validate cards
    it("Search 500ml and validate Lemon, while having multiple cards", () => {
      // Click on search icon
      HomePage.searchQuery.click();
      // Search for 500ml
      HomePage.searchQueryText.type("500ml{enter}");
      // Select a product card - Eggfruit Juice (500ml)
      HomePage.selectCards.filter(":contains('Eggfruit Juice (500ml)')").click();
      // Validate that the card (should) contains "Now with even more exotic flavour."
      HomePage.dialogContainer.should("contain.text", 'Now with even more exotic flavour.');
      // Close the card

      // Select a product card - Lemon Juice (500ml)
      HomePage.overlay.click({force: true});
      HomePage.selectCards.filter(":contains('Lemon Juice (500ml)')").click();
      // Validate that the card (should) contains "Sour but full of vitamins."
      HomePage.dialogContainer.should("contain.text", 'Sour but full of vitamins.');
      // Close the card

      // Select a product card - Strawberry Juice (500ml)
      HomePage.overlay.click({force: true});
      HomePage.selectCards.filter(":contains('Strawberry Juice (500ml)')").click();
      // Validate that the card (should) contains "Sweet & tasty!"
      HomePage.dialogContainer.should("contain.text", 'Sweet & tasty!');
    });
    // Create scenario - Read a review
    it("Read a review", () => {
      // Click on search icon
      HomePage.searchQuery.click();
      // Search for King
      HomePage.searchQueryText.type("King{enter}");
      // Select a product card - OWASP Juice Shop "King of the Hill" Facemask
      HomePage.selectCards.filter(`:contains('OWASP Juice Shop "King of the Hill" Facemask')`).click();
      // Click expand reviews button/icon (wait for reviews to appear)
      cy.wait(300);
      HomePage.reviews.click();
      // Validate review - K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!
      HomePage.comments.filter(`:contains('K33p5 y0ur ju1cy 5plu773r 70 y0ur53lf!')`).should("exist");
    });
    // Create scenario - Add a review
    it("Add a review",() => {
      // Click on search icon
      HomePage.searchQuery.click();
      // Search for Raspberry
      HomePage.searchQueryText.type("Raspberry{enter}")
      // Select a product card - Raspberry Juice (1000ml)
      HomePage.selectCards.filter(`:contains('Raspberry Juice (1000ml)')`).click();
      // Type in review - "Tastes like metal"
      HomePage.reviewInput.click();
      cy.wait(150);
      HomePage.reviewInput.type("Tastes like metal");
      // Click Submit
      HomePage.submitReviewInput.click();
      // Click expand reviews button/icon (wait for reviews to appear)
      cy.wait(300);
      HomePage.reviews.click();
      // Validate review -  "Tastes like metal"
      HomePage.comments.filter(`:contains('Tastes like metal')`).should("exist");
    });

    // Create scenario - Validate product card amount
    it("Validate product card amount", () => {
      // Validate that the default amount of cards is 12
      HomePage.selectCards.should("have.length", 12);

      // Change to 24 items per page
      HomePage.selectItemsPerPage('24');
      HomePage.selectCards.should("have.length", 24);

      // Change to 36 items per page
      HomePage.selectItemsPerPage('36');
      HomePage.selectCards.should("have.length", 36);
    });

    // Create scenario - Buy Girlie T-shirt
    it("Buy Girlie T-shirt",() => {
      // Click on search icon
      HomePage.searchQuery.click();
      // Search for Girlie
      //HomePage.searchIcon.type("Girlie{enter}");
      HomePage.searchQueryText.type("Girlie{enter}");
      // Add to basket "Girlie"
      HomePage.addToBasket.click();
      // Click on "Your Basket" button
      HomePage.basketButton.click();
      // Create page object - BasketPage
      // Click on "Checkout" button
      BasketPage.buttonCheckout.click();
      // Create page object - SelectAddressPage
      // Select address containing "United Fakedom"
      SelectAddressPage.addreses.filter(`:contains('United Fakedom')`).click();
      // Click Continue button
      SelectAddressPage.buttonContinue.click();
      // Create page object - DeliveryMethodPage
      // Select delivery speed Standard Delivery
      DeliveryMethodPage.deliveryOptions.filter(`:contains('Standard Delivery')`).click();
      // Click Continue button
      DeliveryMethodPage.buttonContinue.click();
      // Create page object - PaymentOptionsPage
      // Select card that ends with "5678"
      PaymentOptionsPage.paymentOptions.filter(`:contains('************5678')`).find(`.mat-mdc-radio-button`).click();
      // Click Continue button
      PaymentOptionsPage.buttonContinue.click();
      // Create page object - OrderSummaryPage
      // Click on "Place your order and pay"
      OrderSummaryPage.checkoutButton.click();
      // Create page object - OrderCompletionPage
      // Validate confirmation - "Thank you for your purchase!"
      OrderCompletionPage.title.should("contain.text", "Thank you for your purchase!")
    });

    // Create scenario - Add address
    it("Add address", () => {
      // Click on Account
      HomePage.accountButton.click();
      // Click on Orders & Payment
      HomePage.ordersButton.click();
      // Click on My saved addresses
      HomePage.savedAddressed.click();
      // Create page object - SavedAddressesPage

      // Click on Add New Address
      SavedAddressesPage.addNewAdressButton.click();
      // Create page object - CreateAddressPage

      // Fill in the necessary information
      CreateAddressPage.addcountry.type("Latvia");
      CreateAddressPage.addName.type("Karlis");
      var randomNumber = "371" + Math.round(Math.random() * 10000000);
      CreateAddressPage.addMobileNumber.type(randomNumber);
      var randomZipinLV = "LV-" + Math.round(Math.random() * 9999);
      CreateAddressPage.addZipCode.type(randomZipinLV);
      var address = "Iela - " + Math.round(Math.random() * 100);
      CreateAddressPage.addAddress.type(address);
      CreateAddressPage.addCity.type("Ventspils");
      CreateAddressPage.addState.type("Latvia");
      // Click Submit button
      CreateAddressPage.clickSubmitButton.click();
      // Validate that previously added address is visible
      SavedAddressesPage.checkaddress.filter(':contains("Karlis")').should('exist');

    });

    // Create scenario - Add payment option
    it("Add payment option", () => {

      // Click on Account
      HomePage.accountButton.click();
      // Click on Orders & Payment
      HomePage.ordersButton.click();
      // Click on My payment options
      HomePage.savedPayments.click();
      // Create page object - SavedPaymentMethodsPage
      // Click Add new card
      SavedPaymentMethodsPage.addDrop.click();
      // Fill in Name
      const name = "Some name here " + Math.round(Math.random()*1000);
      SavedPaymentMethodsPage.addName.type(name);
      // Fill in Card Number
      SavedPaymentMethodsPage.addCardNumber.type(Math.round(Math.random()*(9999**4) + (10000**4/10)));
      // Set expiry month to 7
      SavedPaymentMethodsPage.addExpireMonth.select(6);
      // Set expiry year to 2090
      SavedPaymentMethodsPage.addExpireYear.select(10);
      // Click Submit button
      SavedPaymentMethodsPage.submitButton.click();
      // Validate that the card shows up in the list
      SavedPaymentMethodsPage.cards.filter(`:contains('${name}')`).should("exist");
    });
  });
});
