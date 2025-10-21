export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  publisher: string;
  dateAdded: string;
  sale: number;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}