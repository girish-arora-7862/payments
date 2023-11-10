/// <reference types="cypress" />
import { cyc } from "../constants/contants";

declare global {
  namespace Cypress {
    interface Chainable {
      loginAndPay(data: ILoginAndPayOptions): undefined;
    }
  }
}

interface ILoginAndPayOptions {
  email: string;
  amount: string;
}

Cypress.Commands.add("loginAndPay", ({ email, amount }) => {
  cy.visit(cyc.url);
  cy.get(cyc.login.login_heading).should("be.visible");
  cy.get(cyc.login.login_username).type(cyc.user_details.username);
  cy.get(cyc.login.login_password).type(cyc.user_details.password);
  cy.get(cyc.login.login_submit).click();
  cy.get(cyc.payment.start_payment).click();
  cy.get(cyc.payment.payment_to).type(email);
  cy.get(cyc.payment.payment_amount).type(amount);
  cy.get(cyc.payment.payment_submit).click();
});
