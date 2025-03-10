import BaseComponent from '@components/baseComponent';
import type { Locator, Page } from '@playwright/test';

export class TitleAndSearch extends BaseComponent {
  readonly findAddressOnTheMap: Locator;

  constructor(page: Page) {
    super(page);
    this.findAddressOnTheMap = page.getByText('Find address on the map');
    page.getByRole('heading', { name: 'Delivery', exact: true });
  }

  async SearchOnTheMap() {
    await this.findAddressOnTheMap.click();
  }
}
