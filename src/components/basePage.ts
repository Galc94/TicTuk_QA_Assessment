import type { Page } from '@playwright/test';
import { BASE_URL } from '@utilities/constants';

export default abstract class BasePage {
  readonly page: Page;
  readonly path: string;

  constructor(page: Page, path?: string) {
    this.page = page;
    this.path = path ?? '';
  }

  GetPath() {
    return this.path;
  }

  GetURL() {
    return `${BASE_URL}${this.GetPath()}`;
  }

  async GoTo() {
    await this.page.goto(this.GetPath());
  }

  GetPage() {
    return this.page;
  }
}
