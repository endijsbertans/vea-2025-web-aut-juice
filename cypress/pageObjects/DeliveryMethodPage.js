import { BasePage } from "./BasePage";

export class DeliveryMethodPage extends BasePage {
  static get url() {
    return "/#/delivery-method";
  }

  static get deliveryOptions() {
    return cy.get("mat-row");
  }

  static get buttonContinue() {
    return cy.get(`button[aria-label="Proceed to delivery method selection"]`);
  }
}
