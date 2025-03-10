import type { Page } from '@playwright/test';
import BasePage from '@components/basePage';
import { OrderSummary } from '@components/webStore/orderSummary';
import { PersonalizeYourItem } from '@components/webStore/personalizeYourItemPopup';

export class WebStore extends BasePage {
  readonly orderSummary: OrderSummary;
  readonly personalizeYourItemPopup: PersonalizeYourItem;

  constructor(page: Page) {
    super(page);
    this.orderSummary = new OrderSummary(page);
    this.personalizeYourItemPopup = new PersonalizeYourItem(page);
  }
}
