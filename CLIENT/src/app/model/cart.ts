import type { IProduct } from "./product";

export interface ICart {
  cartId: string;
  items: IItem[];
}

export class IItem {
  constructor(product: IProduct, qty: number) {
    this.productId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.pictureUrl = product.pictureUrl;
    this.brand = product.brand;
    this.type = product.type;
    this.quantity = qty;
  }

  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
}
