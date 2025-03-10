import BaseComponent from '@components/baseComponent';
import type { Locator, Page } from '@playwright/test';

export class MapPopup extends BaseComponent {
  readonly locationInput: Locator;
  readonly storeFound: Locator;

  constructor(page: Page) {
    super(page);
    this.locationInput = page.getByTestId('map-dialog-input');
    this.storeFound = page.getByTestId('store-list-item');
  }

  async EnterLocation(Address: string) {
    await this.locationInput.fill(Address);
  }

  async findStoreName(Name: string) {
    let StoreName;
    let StoreAddress;
    for (const storeItems of await this.storeFound.all()) {
      if ((await storeItems.getByRole('heading').textContent()) === Name) {
        StoreName = await storeItems.getByTestId('store-name').textContent();
        StoreAddress = await storeItems.getByTestId('store-address').textContent();
        const startOrderButton = storeItems.getByRole('button', { name: 'Start my order' });
        return { startOrderButton, StoreName, StoreAddress };
      }
    }
    return null;
  }

  async StartOrder(orderButton: Locator) {
    await orderButton.click();
  }
}
