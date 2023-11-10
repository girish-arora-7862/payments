/// <reference types="cypress" />
/// <reference path="../support/e2e.ts" />
import { cyc } from "../constants/contants";

describe("Payments", () => {
  it("checks for 200 success", () => {
    cy.loginAndPay({ email: "user2@gmail.com", amount: "100" });
    cy.get(cyc.payment.payment_response).contains("Payment Success");
  });

  it("checks for 400 bad request", () => {
    cy.loginAndPay({ email: "user2@gmail.com", amount: "1" });
    cy.get(cyc.payment.payment_response).contains("Some Error Occurred...!!!");
  });

  it("checks for 500 internal server error", () => {
    cy.loginAndPay({ email: "user2@gmail.com", amount: "100000" });
    cy.get(cyc.payment.payment_response).contains("Some Error Occurred...!!!");
  });

  it("checks for 401 unauthorized", () => {
    cy.loginAndPay({ email: "hacker@gmail.com", amount: "100" });
    cy.get(cyc.login.login_heading).should("be.visible");
  });
});
