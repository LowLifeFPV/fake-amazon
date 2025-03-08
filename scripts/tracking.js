import { cart } from "../data/cart-class.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getOrder, orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { renderSearchBar } from "./searchbar.js";

renderSearchBar();

cart.updateCartQuantity('.js-cart-quantity');
renderTracking();

function renderTracking () {

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");
  
  const [order, orderedProduct] = getOrder(orderId, productId);

  const product = getProduct(productId);

  let orderHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">Arriving on ${dayjs(orderedProduct.estimatedDeliveryTime).format('dddd, MMMM D')}</div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">Quantity: ${orderedProduct.quantity}</div>

    <img
      class="product-image"
      src="${product.image}"
    />

    <div class="progress-labels-container">
      <div class="progress-label js-progress-preparing">Preparing</div>
      <div class="progress-label js-progress-shipped">Shipped</div>
      <div class="progress-label js-progress-delivered">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar js-progress-bar"></div>
    </div>
  `

  document.querySelector('.js-order-tracking').innerHTML = orderHTML;

  const currentTime = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(orderedProduct.estimatedDeliveryTime);
  let percentShipped = (currentTime.diff(orderTime)/deliveryTime.diff(orderTime))*100;
  percentShipped = percentShipped > 100 ? 100 : percentShipped;
  percentShipped = percentShipped < 15 ? 15 : percentShipped;  
  document.querySelector('.js-progress-bar').style.width = `${percentShipped}%`;

  if (percentShipped < 50) {
      document.querySelector('.js-progress-preparing').classList.add('current-status');
  } else if (percentShipped > 50 && percentShipped < 100) {
      document.querySelector('.js-progress-shipped').classList.add('current-status')
  } else if (100 === percentShipped) {
      document.querySelector('.js-progress-delivered').classList.add('current-status');
  };
};



