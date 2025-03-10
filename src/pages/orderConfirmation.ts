import type { Page } from '@playwright/test';
import BasePage from '@components/basePage';
import { OrderDetails } from '@components/orderConfirmation/orderDetails';

export class OrderConfirmation extends BasePage {
  readonly orderDetails: OrderDetails;

  constructor(page: Page) {
    super(page);
    this.orderDetails = new OrderDetails(page);
  }
}
