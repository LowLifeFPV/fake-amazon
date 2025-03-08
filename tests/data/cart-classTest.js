import { cart } from "../../data/cart-class.js";

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {
    cart.cartItems = 
      [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionsId: '1',
        }
      ];
    
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionsId: '1',
      }])); 
  });

  it('adds an new product to the cart', () => {
    cart.cartItems = [];
        
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{      
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionsId: '1',
    }
    ]));

  });

});


describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionsId: '1',
        }];
  });

  it('removes item from cart', () => {
    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); 
  
    expect(cart.cartItems.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([])); 
  });

  it('removes non-existant item from cart', () => {
    cart.removeFromCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionsId: '1',
    }
    ])); 
  });

});

describe('test suite: updateDeliveryOption', () => {

  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';
  
  it ('update delivery option', () => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
          productId: productId1,
          quantity: 1,
          deliveryOptionsId: '1',
        }]
      
    cart.updateDeliveryOption(productId1, '2');

    expect(cart.cartItems[0].deliveryOptionsId).toEqual('2');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: productId1,
      quantity: 1,
      deliveryOptionsId: '2',
    }]));

  });

  it ('update delivery option on non existant item', () => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
          productId: productId1,
          quantity: 1,
          deliveryOptionsId: '1',
        }];

    cart.updateDeliveryOption(productId2, '2');

    expect(cart.cartItems.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

    expect(cart.cartItems).toEqual([{
      productId: productId1,
      quantity: 1,
      deliveryOptionsId: '1',
    }
    ]);

  });

  it ('update delivery option with fake option', () => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
          productId: productId1,
          quantity: 1,
          deliveryOptionsId: '1',
        }];

    cart.updateDeliveryOption(productId1, '7');

    expect(cart.cartItems.length).toEqual(1);
    
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

    expect(cart.cartItems).toEqual([{
      productId: productId1,
      quantity: 1,
      deliveryOptionsId: '1',
    }
    ]);



  });

});
