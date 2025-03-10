import type { Page } from '@playwright/test';
import BasePage from '@components/basePage';
import { Checkout } from '@components/mercadoPago/checkout';

export class MercadoPagoSandBox extends BasePage {
  readonly checkout: Checkout;

  constructor(page: Page) {
    super(page);
    this.checkout = new Checkout(page);
  }
}
