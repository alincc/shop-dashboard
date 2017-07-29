import { Product } from '../../model/interface';

export interface ProductRemove {
  product: Product;
  soft: boolean;
}

export interface ProductImage {
  _id: string;
  url: string;
  label: string;
  main: boolean;
  createdAt?: string;
}
