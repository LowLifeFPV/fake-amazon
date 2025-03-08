import { deliveryOptions } from "./deliveryOptions.js";

class Cart {

  cartItems;
  #localStorageKey;

  constructor (localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage () {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  
    if (!this.cartItems){
      this.cartItems = [];
    };
  }

  saveToStorage () {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  emptyCart () {
    this.cartItems = [];
    this.saveToStorage();
  }

  updateCartQuantity (classToUpdate) {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    document.querySelector(classToUpdate).innerHTML = cartQuantity;
  };

  addToCart (productId, quantity = 1) {
    let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
  
      if (matchingItem) {
        matchingItem.quantity += quantity;      
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: quantity,
          deliveryOptionsId: '1',
        });
      }
    this.saveToStorage();
  }

  removeFromCart (productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
  
    this.cartItems = newCart;
    
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) { 
    let matchingItem;
    let isRealOption = false;
    deliveryOptions.forEach((deliveryOption) => {
      if (deliveryOption.id === deliveryOptionId) {
        isRealOption = true;
      };
    }); 
    this.cartItems.forEach((cartItem) => {
      if (!isRealOption || productId !== cartItem.productId) {
        return;
      } else {
        matchingItem = cartItem;
        matchingItem.deliveryOptionsId = deliveryOptionId;
        this.saveToStorage();
      }
    });
  
  }
  
  updateQuantity (productId, newQuantity) {
    if (newQuantity === 0) {
      this.removeFromCart(productId);
    } else if (newQuantity < 0 ) {
      return;    
    }
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
       cartItem.quantity = newQuantity; 
      }
    this.saveToStorage();
    });
  }

};

export const cart = new Cart('cart-oop');

const buisnessCart = new Cart('cart-buisness');

export function loadCart (fun) {
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();

};

export async function loadCartFetch () {
  const promise = fetch('https://supersimplebackend.dev/cart'
  ).then((response) => {
    return response.text();
  }).then((responseText) => {
//    console.log(responseText);
  }).catch((error) => {
    console.log('Unexpected error');
    console.log(error);
  });
};

