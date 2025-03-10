import BaseComponent from '@components/baseComponent';
import type { Locator, Page } from '@playwright/test';

export class PersonalizeYourItem extends BaseComponent {
  readonly title: Locator;
  readonly requiredSection: Locator;
  readonly singleSelect1: Locator;
  readonly multipleSelect1: Locator;
  readonly singleSelect2: Locator;
  readonly multipleSelect2: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByRole('heading', { name: 'Personalize Your Item' });
    this.requiredSection = page.getByTestId('menu-item-single-select-row').getByText('Required Section');
    this.singleSelect1 = page.getByTestId('tree-container').getByTestId('select-options-container').getByRole('radio');
    this.multipleSelect1 = page
      .getByTestId('tree-container')
      .getByTestId('select-options-container')
      .getByRole('checkbox');
    this.singleSelect2 = page.getByTestId('select-options-container').getByRole('radio');
    this.multipleSelect2 = page.getByTestId('select-options-container').getByRole('checkbox');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  }

  async AddComplexToCart() {
    //check only first item in both cases
    if (await this.requiredSection.isVisible({ timeout: 2000 })) {
      await this.singleSelect1.first().check();
      await this.multipleSelect1.first().check();
    } else {
      await this.singleSelect2.first().check();
      await this.multipleSelect2.first().check();
    }
    await this.addToCartButton.click();
  }
}
