export interface Item {
    item: string;
    price: number;
}

export interface User {
    userId: number;
    cart: Item[];
    balance: number;
    inventory: Item[];
}

export interface Shop {
    item: string;
    price: number;
}

export interface NewItem {
    item: string;
    price: string | number;
}