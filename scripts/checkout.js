import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderChekcoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart-class.js";

async function loadPage () {
  try {
    await Promise.all ([
      loadProductsFetch(),
      loadCartFetch(),
    ]).then(() => {
      renderChekcoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  } catch (error) {
    console.log('Unexpected error. Please try again later');
    console.log(error);
  };


};

/* try function can be ran on any code
try{
  doesNotExist();
  console.log("ran doesNotExist");
} catch {
  console.log('this is from the catch function')
};
*/

loadPage();

/* concurrent promises ran together
//concurrent promises
Promise.all ([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),

]).then((values) => {
  //console.log(values)
  renderChekcoutHeader();
  renderOrderSummary();
  renderPaymentSummary();;
});
*/

/* consecutive promises
new Promise ((resolve) => {
  loadProducts(() => {
    resolve('value1');
  })

}).then((value) => {
  return new Promise((resolve) => {
    loadCart(() => {
      console.log(value)
      resolve();
    });
  });

}).then(() => {
  renderChekcoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/* nested callbacks
loadProducts(() => {
  loadCart(() => {
    renderChekcoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/

