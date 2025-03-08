import { Product, Clothing, Appliance, getProduct } from "../../data/products.js";

const object1 = {
  id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  image: "images/products/intermediate-composite-basketball.jpg",
  name: "Intermediate Size Basketball",
  rating: {
    stars: 4,
    count: 127
  },
  priceCents: 2095,
  keywords: [
    "sports",
    "basketballs"
  ]
};

const objectClothing = {
  id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
  name: "Adults Plain Cotton T-Shirt - 2 Pack",
  rating: {
    stars: 4.5,
    count: 56
  },
  priceCents: 799,
  keywords: [
    "tshirts",
    "apparel",
    "mens"
  ],
  type: "clothing",
  sizeChartLink: "images/clothing-size-chart.png"
}

const objectAppliance = {
  id: "54e0eccd-8f36-462b-b68a-8182611d9add",
  image: "images/products/black-2-slot-toaster.jpg",
  name: "2 Slot Toaster - Black",
  rating: {
    stars: 5,
    count: 2197
  },
  priceCents: 1899,
  keywords: [
    "toaster",
    "kitchen",
    "appliances"
  ],
  type: "appliance",
  instructionsLink: "images/appliance-instructions.png",
  warrantyLink: "images/appliance-warranty.png",
}

const objectList = [object1, objectClothing, objectAppliance];

describe('test suite: products Product Class', () => {
  const testProduct = new Product (object1);

  it('gets # of stars image url', () => {
    expect(testProduct.getStarsUrl()).toContain('rating-40.png')
  });

  it ('gets the price in $', () => {
    expect(testProduct.getPrice()).toEqual('$20.95');
  });

  it ('gets a blank where otherwise there is a link for extra info', () => {
    expect(testProduct.extraInfoHTML()).toEqual('');
  });

});


describe ('test suite: products Clothing class', () => {
  const testProduct1 = new Clothing (object1);
  const testProductClothing = new Clothing (objectClothing);
  const testProductAppliance = new Clothing (objectAppliance);

  it('gets # of stars image url', () => {
    expect(testProduct1.getStarsUrl()).toContain('rating-40.png');
    expect(testProductClothing.getStarsUrl()).toContain('rating-45.png');
    expect(testProductAppliance.getStarsUrl()).toContain('rating-50.png');
  });

  it ('gets the price in $', () => {
    expect(testProduct1.getPrice()).toEqual('$20.95');
    expect(testProductClothing.getPrice()).toContain('$7.99');
    expect(testProductAppliance.getPrice()).toContain('$18.99');
  });

  it ('gets a blank where otherwise there is a link for extra info', () => {
    expect(testProduct1.extraInfoHTML()).toContain(undefined);
    expect(testProductClothing.extraInfoHTML()).toContain('clothing-size-chart.png');
    expect(testProductAppliance.extraInfoHTML()).toContain(undefined);
  });
});


describe ('test suite: producs Appliance class', () => {
  const testProduct1 = new Appliance (object1);
  const testProductClothing = new Appliance (objectClothing);
  const testProductAppliance = new Appliance (objectAppliance);

  it('gets # of stars image url', () => {
    expect(testProduct1.getStarsUrl()).toContain('rating-40.png');
    expect(testProductClothing.getStarsUrl()).toContain('rating-45.png');
    expect(testProductAppliance.getStarsUrl()).toContain('rating-50.png');
  });

  it ('gets the price in $', () => {
    expect(testProduct1.getPrice()).toEqual('$20.95');
    expect(testProductClothing.getPrice()).toContain('$7.99');
    expect(testProductAppliance.getPrice()).toContain('$18.99');
  });

  it ('gets a blank where otherwise there is a link for extra info', () => {
    expect(testProduct1.extraInfoHTML()).not.toContain('appliance-instructions.png' && 'appliance-warranty.png');
    expect(testProductClothing.extraInfoHTML()).not.toContain('appliance-instructions.png' && 'appliance-warranty.png');
    expect(testProductAppliance.extraInfoHTML()).toContain('appliance-instructions.png' && 'appliance-warranty.png');
  });

});

describe('test suite: gets product from product list', () => {
  it('returns a real product', () => {
    
    const objectListAfterProductClass = objectList.map((eachObjectFromList) => {
      return new Product (eachObjectFromList)
    });
    const testRealReturn = getProduct(object1.id);
    const testBadReturn = getProduct('not-a-real-product-id');
    
    expect(testRealReturn).toEqual(objectListAfterProductClass[0]);
        
    expect(testBadReturn).toEqual(undefined);
  });
});

