import { deliveryOptions } from "./deliveryOptions.js";

function Cart (localStorageKey) {

  const cart = {
    cartItems: undefined,
    
    loadFromStorage () {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    
      if (!this.cartItems){
        this.cartItems =  [{
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
    },
  
    saveToStorage () {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
    addToCart (productId) {
      let matchingItem;
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
    
        if (matchingItem) {
          matchingItem.quantity += 1;      
        } else {
          this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionsId: '1',
          });
        }
      this.saveToStorage();
    },
  
    removeFromCart (productId) {
      const newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
    
      this.cartItems = newCart;
      
      this.saveToStorage();
    },
  
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
    
    },
    
    updateCartQuantity (classToUpdate) {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      document.querySelector(classToUpdate).innerHTML = cartQuantity;
    },
  
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
    },
    
  };

  return cart;
};

const cart = Cart('cart-oop');

const buisnessCart = Cart('cart-buisness');

cart.loadFromStorage();

buisnessCart.loadFromStorage();


console.log(cart);
console.log(buisnessCart);