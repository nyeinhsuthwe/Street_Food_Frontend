declare global {
  interface Inputs {
    _id?: string;
    menu: string;
    price: number;
    quantity: number;
    description: string;
    photo?: string;
    category_id: string;
  }
  interface Categories {
    _id?: string;
    name: string;
    photo?: string;
  }
}
