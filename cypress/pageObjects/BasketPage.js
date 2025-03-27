import { BasePage } from "./BasePage";

export class BasketPage extends BasePage {
    static get url() {
        return "/#/basket";
    }

    static get buttonCheckout() {
        return cy.get("button#checkoutButton");
    }
}
