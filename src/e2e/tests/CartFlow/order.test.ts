import { test, request } from '@fixtures/TestUserFixture';
import { expect, APIResponse } from '@playwright/test';
import {
  BASE_URL,
  CARDHOLDER_NAME,
  CLIENT_ADDRESS_COMMENT,
  CLIENT_EMAIL,
  CLIENT_NAME,
  CLIENT_PHONE,
  CREDIT_CARD_NUMBER,
  CVV,
  EXPIRATION_DATE,
  RUT,
  STORE_ADDRESS,
} from '@utilities/constants';
import { findItemArguments } from '@components/webStore/orderSummary';
import { get_report_new } from 'src/e2e/types/API/getReportNew';

test.describe('Order Test Suite', () => {
  test.describe('Demo of fixture', { tag: ['@MakeTictukOrder'] }, () => {
    test('QA Assessment Test Scenario', async ({ home, webStore, checkout, mercadoPagoSandBox, orderConfirmation }) => {
      test.info().annotations.push({
        type: 'Description',
        description: `Navigate to web store page of test suite. 
          validate store selection by location, checkout, 
          mercadoPago Sandbox and send a POST request to validate the order.`,
      });

      await test.step('Navigate to home page', async () => {
        await home.GoTo();
        expect(home.GetPage().url()).toBe(BASE_URL);
      });

      await test.step("Localize store named: 'Automation'", async () => {
        const storeName = 'Automation';

        await home.titleAndSearch.SearchOnTheMap();
        await home.mapPopup.EnterLocation(STORE_ADDRESS);
        await home.GetPage().keyboard.press('Enter');
        await home.page.waitForLoadState('networkidle');
        const storeFound = await home.mapPopup.findStoreName(storeName);
        if (!storeFound) {
          throw new Error(`Store named '${storeName}' was not found`);
        }
        console.log('Store localized: ', storeFound.StoreName, '\n  - with address: ', storeFound.StoreAddress);
        expect(storeFound.StoreAddress).toBe(STORE_ADDRESS);
        await home.mapPopup.StartOrder(storeFound.startOrderButton);
      });

      await test.step('Add items to cart', async () => {
        await expect(webStore.orderSummary.summaryTitle).toBeVisible();
        const firstItem = await webStore.orderSummary.findItem(findItemArguments.First);
        if (firstItem) {
          await webStore.orderSummary.AddToCart(firstItem.itemCartButton);
          expect(await webStore.orderSummary.ItemConfirmationAlert()).toContain(
            `'${firstItem.itemName}' was added to your cart`,
          );
          console.log('Added Item to cart: ', firstItem.itemName);
          await expect(webStore.orderSummary.confirmationAlert).toHaveCount(0);
        } else {
          throw new Error('First item not found or confirmation alert message was updated');
        }
        const lastItem = await webStore.orderSummary.findItem(findItemArguments.Last);
        if (lastItem) {
          await webStore.orderSummary.AddToCart(lastItem.itemCartButton);
          expect(await webStore.orderSummary.ItemConfirmationAlert()).toContain(
            `'${lastItem.itemName}' was added to your cart`,
          );
          console.log('Added Item to cart: ', lastItem.itemName);
          await expect(webStore.orderSummary.confirmationAlert).toHaveCount(0);
        } else {
          throw new Error('Last item not found or confirmation alert message was updated');
        }
        const ComplexItemDesired1 = await webStore.orderSummary.findItem(undefined, 'Required Inner Section');
        if (ComplexItemDesired1) {
          await webStore.orderSummary.AddToCart(ComplexItemDesired1.itemCartButton);
          await webStore.personalizeYourItemPopup.AddComplexToCart(); 
          expect(await webStore.orderSummary.ItemConfirmationAlert()).toContain(
            `'${ComplexItemDesired1.itemName}' was added to your cart`,
          );
          console.log('Added Item to cart: ', ComplexItemDesired1.itemName);
          await expect(webStore.orderSummary.confirmationAlert).toHaveCount(0);
        } else {
          throw new Error('Required Inner Section item not found or confirmation alert message was updated');
        }
        const ComplexItemDesired2 = await webStore.orderSummary.findItem(undefined, 'AU-MENU-ITEMS Complex Item - 2');
        if (ComplexItemDesired2) {
          await webStore.orderSummary.AddToCart(ComplexItemDesired2.itemCartButton);
          await webStore.personalizeYourItemPopup.AddComplexToCart();
          expect(await webStore.orderSummary.ItemConfirmationAlert()).toContain(
            `'${ComplexItemDesired2.itemName}' was added to your cart`,
          );
          console.log('Added Item to cart: ', ComplexItemDesired2.itemName);
          await expect(webStore.orderSummary.confirmationAlert).toHaveCount(0);
        } else {
          throw new Error('AU-MENU-ITEMS Complex Item - 2 not found or confirmation alert message was updated');
        }

        // confirms order summary
        expect(await webStore.orderSummary.TotalSummary()).toBe(4);

        for (const item of [firstItem, lastItem, ComplexItemDesired1, ComplexItemDesired2]) {
          expect(await webStore.orderSummary.ConfirmOrderSummary()).toContain(item.itemName);
        }
      });

      await test.step('Proceed to checkout', async () => {
        await webStore.orderSummary.GoToCheckout();
        await expect(checkout.GetPage()).toHaveURL(/checkout\?/);
      });

      await test.step('Fill in customer details in checkout', async () => {
        await checkout.checkoutForm.FillInCustomerDetails(
          CLIENT_NAME,
          CLIENT_PHONE,
          CLIENT_EMAIL,
          CLIENT_ADDRESS_COMMENT,
        );
        console.log('Checkout form filled');
        await expect(checkout.checkoutForm.upsellItem).toBeVisible();
        await expect(checkout.checkoutForm.upsellItemAdded).toBeVisible();
        await checkout.checkoutForm.SelectOnlinePayment();
        await checkout.checkoutForm.SubmitOrder();
      });

      await test.step('Fill in credit card details in mercadoPago checkout', async () => {
        await expect(mercadoPagoSandBox.GetPage()).toHaveURL(/sandbox.mercadopago.cl/);
        await mercadoPagoSandBox.checkout.SelectTarjetaDeCredito();
        await mercadoPagoSandBox.checkout.FillInCreditCardDetails(
          CREDIT_CARD_NUMBER,
          CARDHOLDER_NAME,
          EXPIRATION_DATE,
          CVV,
        );
        await mercadoPagoSandBox.checkout.Continue();

        await mercadoPagoSandBox.checkout.FillRUT(RUT);
        await mercadoPagoSandBox.checkout.Continue();
        await mercadoPagoSandBox.checkout.Pay();
        console.log('Payment done in MercadoPago');
      });

      await test.step('Validate order confirmation number', async () => {
        const orderNumbers = [];
        let deliveryOrderNumber: string;

        const orderNumber = await orderConfirmation.orderDetails.GetOrderNumber();
        if (orderNumber) {
          deliveryOrderNumber = orderNumber;
        } else {
          throw new Error('Delivery order number is undefined');
        }
        console.log(`Order Confirmation Number: ${deliveryOrderNumber}`);
        const timestamp = new Date().toLocaleDateString('en-US');

        //Send POST to validate order Number
        const postCall: APIResponse = await (
          await request
        ).post('', {
          data: {
            accessKey: '123',
            chainId: '8315bf51-dd7c-364d-f63e-fbdcfca69ab0',
            endDate: timestamp,
            isChain: true,
            reportFor: '8315bf51-dd7c-364d-f63e-fbdcfca69ab0',
            startDate: timestamp,
            storeId: '48499619-0afe-3382-da0d-408b6be8c835',
            successOnly: true,
          },
        });
        expect(postCall.ok()).toBeTruthy();
        expect(postCall.status()).toBe(200);

        // validate order number in POST response
        const responseData = (await postCall.json()) as get_report_new;
        let orderFound;

        for (const order of responseData.orders) {
          orderNumbers.push(order.return_order_number);
        }
        for (const order of orderNumbers) {
          if (order && order.toString() === deliveryOrderNumber) {
            orderFound = order;
          }
        }
        expect(orderFound).toMatch(deliveryOrderNumber);
        console.log(`Order Number ${deliveryOrderNumber} was validated in POST call`);
      });
    });
  });
});
