import BaseComponent from '@components/baseComponent';
import type { Locator, Page } from '@playwright/test';

export enum findItemArguments {
  First = 'First',
  Last = 'Last',
}

export class OrderSummary extends BaseComponent {
  readonly summaryTitle: Locator;
  readonly itemList: Locator;
  readonly itemCheckout: Locator;
  readonly confirmationAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.summaryTitle = page.getByRole('heading', { name: 'Order Summary' });
    this.itemList = page.getByTestId('menu-section-container');
    this.itemCheckout = page.getByTestId('cart-item-card').getByTestId('cart-item-title');
    this.confirmationAlert = page.getByTestId('snackbar-text');
  }

  async findItem(Position?: findItemArguments, ItemName?: string) {
    let itemName;
    let itemCartButton;
    if (Position === findItemArguments.First) {
      itemName = await this.itemList.first().getByTestId('menu-item-card').first().getByRole('heading').textContent();
      itemCartButton = this.itemList.first().getByTestId('menu-item-card').first().getByTestId('menu-item-cart-button');
      return { itemName, itemCartButton };
    } else if (Position === findItemArguments.Last) {
      itemName = await this.itemList.last().getByTestId('menu-item-card').last().getByRole('heading').textContent();
      itemCartButton = this.itemList.last().getByTestId('menu-item-card').last().getByTestId('menu-item-cart-button');
      return { itemName, itemCartButton };
    } else if (ItemName) {
      for (const items of await this.itemList.getByTestId('menu-item-card').all()) {
        if ((await items.getByRole('heading').textContent()) === ItemName) {
          itemCartButton = items.getByTestId('menu-item-cart-button');
          itemName = ItemName;
          return { itemName, itemCartButton };
        }
      }
    } else {
      throw new Error('Invalid argument');
    }
    return null;
  }

  async AddToCart(item: Locator) {
    await item.click();
    await this.page.waitForLoadState('load');
  }

  async ItemConfirmationAlert() {
    return await this.confirmationAlert.textContent();
  }

  async TotalSummary() {
    return await this.itemCheckout.count();
  }

  async ConfirmOrderSummary() {
    const allCheckoutItems = await this.itemCheckout.all();
    const checkoutItems = [];
    for (const item of allCheckoutItems) {
      checkoutItems.push(await item.textContent());
    }
    return checkoutItems;
  }

  async GoToCheckout() {
    await this.page.click('text=checkout');
  }
}
