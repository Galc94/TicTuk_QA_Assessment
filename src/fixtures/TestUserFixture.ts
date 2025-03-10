import { test as base } from '@playwright/test';
import { request as APIbase } from '@playwright/test';
import { API_ENDPOINT } from '@utilities/constants';
import { Home } from '@pages/home';
import { WebStore } from '@pages/webStore';
import { Checkout } from '@pages/checkout';
import { MercadoPagoSandBox } from '@pages/mercadoPagoSandBox';
import { OrderConfirmation } from '@pages/orderConfirmation';

export const test = base.extend<{
  home: Home;
  webStore: WebStore;
  checkout: Checkout;
  mercadoPagoSandBox: MercadoPagoSandBox;
  orderConfirmation: OrderConfirmation;
}>({
  home: async ({ page }, use) => {
    const home = new Home(page);
    await use(home);
  },
  webStore: async ({ page }, use) => {
    const webStore = new WebStore(page);
    await use(webStore);
  },
  checkout: async ({ page }, use) => {
    const checkout = new Checkout(page);
    await use(checkout);
  },
  mercadoPagoSandBox: async ({ page }, use) => {
    const mercadoPagoSandBox = new MercadoPagoSandBox(page);
    await use(mercadoPagoSandBox);
  },
  orderConfirmation: async ({ page }, use) => {
    const orderConfirmation = new OrderConfirmation(page);
    await use(orderConfirmation);
  },
});

export const request = APIbase.newContext({
  baseURL: API_ENDPOINT,
});
