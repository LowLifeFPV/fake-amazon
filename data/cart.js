import { deliveryOptions } from "./deliveryOptions.js";

export let cart;

loadFromStorage();

export function loadFromStorage () {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart){
    cart =  [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionsId: '1'
    }, {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionsId: '2'
    }
    ];

  };
};

export function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function addToCart (productId) {
  let matchingItem;
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;      
    } else {
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionsId: '1',
      });
    }
  saveToStorage();
};

export function removeFromCart (productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  
  saveToStorage();
};

export function updateCartQuantity (classToUpdate) {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(classToUpdate).innerHTML = cartQuantity;
};

export function updateQuantity (productId, newQuantity) {
  if (newQuantity === 0) {
    removeFromCart(productId);
  } else if (newQuantity < 0 ) {
    return;    
  }
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
     cartItem.quantity = newQuantity; 
    }
  saveToStorage();
  });
};

export function updateDeliveryOption(productId, deliveryOptionId) { 
  let matchingItem;
  let isRealOption = false;
  deliveryOptions.forEach((deliveryOption) => {
    if (deliveryOption.id === deliveryOptionId) {
      isRealOption = true;
    };
  }); 
  cart.forEach((cartItem) => {
    if (!isRealOption || productId !== cartItem.productId) {
      return;
    } else {
      matchingItem = cartItem;
      matchingItem.deliveryOptionsId = deliveryOptionId;
      saveToStorage();
    }
  });

};