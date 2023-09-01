import { simulatedUser } from "../../simulator/simulator";
import Users from "../../data/users";
import { Item } from "../../utils/util";

export const getUserById = (id: number) => {
    return Users.find((user) => user.userId === id);
};

export const getUserBalance = (userId: number) => {
    const data = simulatedUser(userId);
    return data !== undefined ? data.balance : null;
};

export const updateUserBalance = (userId: number, coins: number) => {
    const data = simulatedUser(userId);
    if (data) {
        data.balance += coins;
        return true;
    }

    return false;
};

export const getUserInventory = (userId: number) => {
    const data = simulatedUser(userId);
    return data !== undefined ? data.inventory : null;
};

export const updateUserInventory = (userId: number, item: Item) => {
    const data = simulatedUser(userId);
    if (data) {
        data.inventory.push(item);
        return true;
    }

    return false;
};

export const getUserCart = (userId: number) => {
    const data = simulatedUser(userId);
    return data !== undefined ? data.cart : null;
};

export const clearUserCart = (userId: number) => {
    const data = simulatedUser(userId);
    if (data) {
        data.cart = [];
        return true;
    }

    return false;
};