import type { Page } from '@playwright/test';
import BasePage from '@components/basePage';
import { CheckoutForm } from '@components/checkout/checkoutForm';

export class Checkout extends BasePage {
  readonly checkoutForm: CheckoutForm;

  constructor(page: Page) {
    super(page);
    this.checkoutForm = new CheckoutForm(page);
  }
}
