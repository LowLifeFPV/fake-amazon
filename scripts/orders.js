import { cart } from "../data/cart-class.js";
import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import formatCurrency from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderSearchBar } from "./searchbar.js";

cart.updateCartQuantity('.js-cart-quantity');

renderSearchBar ();

renderOrdersGrid();

function renderOrdersGrid () {

  let ordersHTML = '';

  orders.forEach(order => {

    ordersHTML += 
      `
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format('MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>   

            <div class="order-details-grid">
              ${renderOrdersDetailGrid(order)}
            </div>
        </div>

      `;
    });

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

};

function renderOrdersDetailGrid (order) {

  let productHTML = ``;

  order.products.forEach(orderItem =>  {

    const product = getProduct(orderItem.productId);

    productHTML +=`
  
      <div class="product-image-container">
        <img src="${product.image}" />
      </div>

      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">Arriving on: ${dayjs(orderItem.estimatedDeliveryTime).format('MMMM D')}</div>
        <div class="product-quantity">Quantity: ${orderItem.quantity}</div>
        <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.id}">
          <img class="buy-again-icon" src="images/icons/buy-again.png" />
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
          <button
            class="track-package-button button-secondary js-track-package"
          >
            Track package
          </button>
        </a>
      </div>
  `}) 

  return productHTML;

};

document.querySelectorAll('.js-buy-again-button').forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    cart.addToCart(productId);
    cart.updateCartQuantity('.js-cart-quantity');
  })
})

