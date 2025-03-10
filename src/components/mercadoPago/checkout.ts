import BaseComponent from '@components/baseComponent';
import { expect, type Locator, type Page } from '@playwright/test';

export class Checkout extends BaseComponent {
  readonly creditCard: Locator;
  readonly cardNumberIframe: string;
  readonly cardNumber: string;
  readonly cardHolderName: string;
  readonly expirationDate: string;
  readonly ccv: string;
  readonly continueButton: Locator;
  readonly rutTextbox: Locator;
  readonly payButton: Locator;

  constructor(page: Page) {
    super(page);
    this.creditCard = page.getByRole('button', { name: 'Tarjeta de crédito' });
    this.cardNumberIframe = 'iframe[name="cardNumber"]';
    this.cardNumber = '#card_number';
    this.cardHolderName = '#fullname';
    this.expirationDate = '#expiration_date';
    this.ccv = '#cvv';
    this.continueButton = page.getByText('Continuar');
    this.rutTextbox = page.locator('#number');
    this.payButton = page.getByText('Pagar', { exact: true });
  }

  async SelectTarjetaDeCredito() {
    await this.creditCard.click();
  }

  async FillInCreditCardDetails(cardNumber: string, cardHolderName: string, expirationDate: string, ccv: string) {
    // needed keyboard type function to enter text in those textbox within iframe
    await expect(this.creditCard).toHaveCount(0);
    await this.page.click(this.cardNumber);
    await this.page.keyboard.type(cardNumber);
    await this.page.click(this.cardHolderName);
    await this.page.keyboard.type(cardHolderName);
    await this.page.click(this.expirationDate);
    await this.page.keyboard.type(expirationDate);
    await this.page.click(this.ccv);
    await this.page.keyboard.type(ccv);
  }

  async Continue() {
    await this.continueButton.click();
    await this.page.waitForLoadState('load');
  }

  async FillRUT(RUT: string) {
    await this.rutTextbox.fill(RUT);
  }

  async Pay() {
    await this.payButton.click();
  }
}
