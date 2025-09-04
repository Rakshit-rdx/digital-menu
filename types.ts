export interface Category {
  id: string;
  name: string;
}

export type CategoryID = Category['id'];

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: CategoryID;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
