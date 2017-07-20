import {
  Order,
  OrderLine,
  Customer,
  Product,
  User,
  Shipping,
  ShippingStatus,
  Category,
  Payment,
  ShippingLine,
} from '../app/model/interface';

export const FAKE_PAYMENT1: Payment = {
  _id: "1",
  name: "Payment 1",
  image: "Image 1",
  active: true,
};

export const FAKE_PAYMENT2: Payment = {
  _id: "2",
  name: "Payment 2",
  image: "Image 2",
  active: false,
};

export const FAKE_PAYMENTS: Payment[] = [FAKE_PAYMENT1, FAKE_PAYMENT2];

export const FAKE_CATEGORY1: Category = {
  _id: "1",
  name: "Category 1",
  image: "Image 1",
  products: [],
  description: 'description',
  active: true,
};

export const FAKE_CATEGORY2: Category = {
  _id: "2",
  name: "Category 2",
  image: "Image 2",
  products: [],
  description: 'description',
  active: true,
};

export const FAKE_CATEGORIES: Category[] = [FAKE_CATEGORY1, FAKE_CATEGORY2];

export const FAKE_PRODUCT1: Product = new Product({
  _id: "1",
  name: "Product 1",
  description: "Description 1",
  image: "Image 1",
  price: 100,
  active: true,
  onSale: false,
  combinations: [],
});

export const FAKE_PRODUCT2: Product = new Product({
  _id: "2",
  name: "Product 2",
  description: "Description 2",
  image: "Image 2",
  price: 100,
  active: true,
  onSale: false,
  combinations: [],
});

export const FAKE_PRODUCTS: Product[] = [FAKE_PRODUCT1, FAKE_PRODUCT2];

export const PRODUCT_NOT_IN_CART: OrderLine = new OrderLine({
  product: FAKE_PRODUCT1,
  quantity: 0,
  price: FAKE_PRODUCT1.price,
});

const FAKE_ORDERLINE1 = new OrderLine({
  product: FAKE_PRODUCT1,
  quantity: 1,
  price: FAKE_PRODUCT1.price,
});

const FAKE_ORDERLINE2 = new OrderLine({
  product: FAKE_PRODUCT2,
  quantity: 1,
  price: FAKE_PRODUCT2.price,
});

export const MOCK_ITEMS: OrderLine[] = [FAKE_ORDERLINE1, FAKE_ORDERLINE2];

export const MOCK_CUSTOMER1: Customer = new Customer({
  _id: "1",
  phone: "phone",
  country: "country",
  email: 'email',
  city: 'city',
  postnumber: "postnumber",
  address: "address",
  lastname: "lastname",
  firstname: "firstname",
  orders: [],
  createdAt: '',
});

export const MOCK_CUSTOMER2: Customer = new Customer({
  _id: "1",
  phone: "phone 2",
  country: "country 2",
  email: 'email 2',
  city: 'city 2',
  postnumber: "postnumber 2",
  address: "address 2",
  lastname: "lastname 2",
  firstname: "firstname 2",
  orders: [],
  createdAt: '',
});

export const FAKE_USER1: User = new User({
  _id: "1",
  admin: false,
  username: "john",
  password: "doe",
  email: "johndoe@email.com",
  ip: "212.213.12.2",
  customer: MOCK_CUSTOMER1,
});

export const MOCK_SHIPPING1: Shipping = {
  _id: "100",
  name: "name",
  description: "description",
  price: 100,
  active: true,
}
export const FAKE_SHIPPING_LINE1 = new ShippingLine(MOCK_SHIPPING1, "111", 1, 1);


export const MOCK_ORDER1 = new Order({
    _id: "100",
    updatedAt: "0000",
    createdAt: "0000",
    total: 100,
    status: ShippingStatus.Pending,
    statusLog: [],
    items: MOCK_ITEMS,
    customer: MOCK_CUSTOMER1,
    // shipping: MOCK_SHIPPING1
    shipping: FAKE_SHIPPING_LINE1,
    messages: [],
});

export const MOCK_SHIPPINGS: Shipping[] = [MOCK_SHIPPING1];
