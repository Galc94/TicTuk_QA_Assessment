import type { Page } from '@playwright/test';
import BasePage from '@components/basePage';
import { TitleAndSearch } from '@components/home/titleAndSearch';
import { AlertWindowState } from '@components/home/alertWindowState';
import { MapPopup } from '@components/home/mapPopup';

export class Home extends BasePage {
  readonly titleAndSearch: TitleAndSearch;
  readonly mapPopup: MapPopup;
  readonly alertWindowState: AlertWindowState;

  constructor(page: Page) {
    super(page);
    this.titleAndSearch = new TitleAndSearch(page);
    this.mapPopup = new MapPopup(page);
    this.alertWindowState = new AlertWindowState(page);
  }
}
