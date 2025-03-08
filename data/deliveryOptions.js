import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function getDeliveryOption (deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId)
      deliveryOption = option;
  });
  return deliveryOption || deliveryOptions[0];
};

export function calculateDeliveryDate (deliveryOption) {
  let deliveryDate = dayjs();
  let countdown = deliveryOption.deliveryDays;
  while (countdown > 0) {
    let checkDay = deliveryDate.format('dddd');
    if (checkDay === 'Friday' || checkDay === 'Saturday') {
      deliveryDate = deliveryDate.add(1, 'days');
    } else {
      deliveryDate = deliveryDate.add(1, 'days');
      countdown --;
    };  
  };
  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
};

export const deliveryOptions = [{
id: '1',
deliveryDays: 7,
priceCents: 0,
}, {
id: '2',
deliveryDays: 3,
priceCents: 499,
}, {
id: '3',
deliveryDays: 1,
priceCents: 999,
}];