import BaseComponent from '@components/baseComponent';
import type { Locator, Page } from '@playwright/test';

export class OrderDetails extends BaseComponent {
  readonly orderNumber: Locator;

  constructor(page: Page) {
    super(page);
    this.orderNumber = page.getByTestId('your-order-number');
  }

  async GetOrderNumber() {
    const od = await this.orderNumber.textContent();
    // const modifiedOd = od?.substring(1);
    return od?.substring(1);
  }
}
