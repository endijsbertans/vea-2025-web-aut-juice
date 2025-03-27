import { BasePage } from "./BasePage";
import {HomePage} from "./HomePage";

export class ProductPage extends BasePage {
  static get url() {
    return "/#/search";
  }

  static search(query) {
    HomePage.searchQuery.click();
    cy.get("#mat-input-0").type(`${query}{enter}`);
  }

  static getProductCard(productName) {
    return cy.contains("mat-card", productName);
  }

  static get productDescription() {
    return cy.get("mat-dialog-content p");
  }

  static get closeDialogButton() {
    return cy.get("mat-dialog-container button[aria-label='Close Dialog']");
  }

  static get reviewExpand() {
    return cy.get("[aria-label='Expand for Reviews'] > mat-expansion-panel-header");
  }

  static get reviewInput() {
    return cy.get("textarea#mat-input-1");
  }

  static get submitReviewButton() {
    return cy.get("#submitButton");
  }
}
