import { cart } from "../data/cart-class.js";
import { products, loadProducts, filterProducts } from "../data/products.js";
import { getUrlSearch, renderSearchBar} from "./searchbar.js";

renderSearchBar();
//loadProducts(renderProductsGrid); now builds products from fetch inside products page
renderProductsGrid();
cart.updateCartQuantity('.js-cart-quantity');

function renderProductsGrid () {

  let productsHTML = '';

  filterProducts();
  
  products.forEach((product) => {
    productsHTML += `
            <div class="product-container">
            <div class="product-image-container">
              <img
                class="product-image"
                src="${product.image}"
              />
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img
                class="product-rating-stars"
                src=${product.getStarsUrl()}
              />
              <div class="product-rating-count link-primary">${product.rating.count}</div>
            </div>

            <div class="product-price">${product.getPrice()}</div>

            <div class="product-quantity-container">
              <select id="js-select-quantity-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png" />
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
          </div>


    `
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    
    let addedToCartPopUpTimeoutId;

    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      let quantity = Number(document.getElementById(`js-select-quantity-${productId}`).value);
      cart.addToCart(productId, quantity);
      cart.updateCartQuantity('.js-cart-quantity');

      
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
      addedMessage.classList.add('added-to-cart-popup');
      if (addedToCartPopUpTimeoutId) {
        clearTimeout(addedToCartPopUpTimeoutId)
      };
      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-popup');
      }, 2000);

      addedToCartPopUpTimeoutId = timeoutId;

    });
  });

};
