import { BasePage } from "./BasePage";

export class OrderCompletionPage extends BasePage {
  static get url() {
    return "/#/order-completion/";
  }

  static get title() {
    return cy.get(".confirmation");
  }
}
