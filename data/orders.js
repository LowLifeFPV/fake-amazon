export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder (order) {
  orders.unshift(order);
  saveToStorage();
};

function saveToStorage () {
  localStorage.setItem('orders', JSON.stringify(orders));
};

export function getOrder (orderId, productId) {
  let matchingOrder;
  let orderedProduct;
  orders.forEach((element) => {
    if (orderId === element.id) {
      matchingOrder = element;
      matchingOrder.products.forEach(product => {
        if (productId === product.productId) {
          orderedProduct = product;
        };
      });
    }
      
  })
  return [matchingOrder, orderedProduct];
};
