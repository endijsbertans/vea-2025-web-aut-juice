import { BasePage } from "./BasePage";

export class SelectAddressPage extends BasePage {
  static get url() {
    return "/#/address/select";
  }

  static get addreses() {
    return cy.get("mat-row");
  }

  static get buttonContinue() {
    return cy.get(`[aria-label="Proceed to payment selection"]`);
  }

}
