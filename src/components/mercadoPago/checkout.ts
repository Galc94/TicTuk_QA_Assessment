import BaseComponent from '@components/baseComponent';
import { expect, FrameLocator, type Locator, type Page } from '@playwright/test';

export class Checkout extends BaseComponent {
  readonly creditCard: Locator;
  readonly cardNumberIframe: FrameLocator;
  readonly expirationDateIframe: FrameLocator;
  readonly securityCodeIframe: FrameLocator;
  readonly cardHolderName: Locator;
  readonly continueButton: Locator;
  readonly rutTextbox: Locator;
  readonly payButton: Locator;

  constructor(page: Page) {
    super(page);
    this.creditCard = page.getByRole('button', { name: 'Tarjeta de crédito' });
    this.cardNumberIframe = page.locator('iframe[name="cardNumber"]').contentFrame();
    this.expirationDateIframe = page.locator('iframe[name="expirationDate"]').contentFrame();
    this.securityCodeIframe = page.locator('iframe[name="securityCode"]').contentFrame();
    this.cardHolderName = page.locator('#fullname');
    this.continueButton = page.getByText('Continuar');
    this.rutTextbox = page.locator('#number');
    this.payButton = page.getByText('Pagar', { exact: true });
  }

  async SelectTarjetaDeCredito() {
    await this.creditCard.click();
  }

  async FillInCreditCardDetails(cardNumber: string, cardHolderName: string, expirationDate: string, ccv: string) {
    await expect(this.creditCard).toHaveCount(0);
    await this.cardNumberIframe.getByRole('textbox').fill(cardNumber);
    await this.cardHolderName.fill(cardHolderName);
    await this.expirationDateIframe.getByRole('textbox').fill(expirationDate);
    await this.securityCodeIframe.getByRole('textbox').fill(ccv);
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
