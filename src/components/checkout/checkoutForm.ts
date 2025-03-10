import BaseComponent from '@components/baseComponent';
import type { Locator, Page } from '@playwright/test';

export class CheckoutForm extends BaseComponent {
  readonly name: Locator;
  readonly phoneNumber: Locator;
  readonly email: Locator;
  readonly addressComments: Locator;
  readonly upsellItem: Locator;
  readonly upsellItemAdded: Locator;
  readonly onlinePayment: Locator;
  readonly submitOrder: Locator;

  constructor(page: Page) {
    super(page);
    this.name = page.getByPlaceholder('Type your name');
    this.phoneNumber = page.getByPlaceholder('Type your phone number');
    this.email = page.getByPlaceholder('example@email.com');
    this.addressComments = page.locator('[name="addressComments"]');
    this.upsellItem = page.locator('//div[contains(@class,"CartUpsells__Container")]').getByText('Treat yourself!');
    this.upsellItemAdded = page.locator('//div[contains(@class,"CartUpsells__Container")]').getByText('Added');
    this.onlinePayment = page.getByText('Online Payment');
    this.submitOrder = page.getByRole('button', { name: 'Submit Order' });
  }

  async FillInCustomerDetails(name: string, phoneNumber: string, email: string, addressComments: string) {
    await this.name.fill(name);
    await this.phoneNumber.fill(phoneNumber);
    await this.email.fill(email);
    await this.addressComments.fill(addressComments);
  }

  async CheckUpsellItem() {
    await this.page.waitForLoadState('networkidle');
    return this.upsellItem, this.upsellItemAdded;
  }

  async SelectOnlinePayment() {
    await this.onlinePayment.click();
    await this.page.waitForLoadState('networkidle');
  }

  async SubmitOrder() {
    await this.submitOrder.click();
  }
}
