export interface ICart {
  cartId: string;
  items: IItem[];
}

export interface IItem {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
}
