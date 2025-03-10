import BaseComponent from '@components/baseComponent';
import type { Locator, Page } from '@playwright/test';

export class AlertWindowState extends BaseComponent {
  readonly okButton: Locator;

  constructor(page: Page) {
    super(page);
    this.okButton = page.getByTestId('dialog-confirm-button');
  }

  async CloseLocationPermissionAlert() {
    await this.okButton.click();
  }
}
