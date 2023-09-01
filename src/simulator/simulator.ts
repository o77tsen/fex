import Users from "../data/users";
import Shop from "../data/shop";

export const simulatedUser = (userId: number) => {
    const user = Users.find((user) => user.userId === userId);
    if (user) {
        return user;
    } else {
        console.warn("User not found.");
    }
};

export const simulatedShop = (itemName: string) => {
    const shopItems = Shop.find((item) => item.item === itemName);
    if (shopItems) {
        return shopItems;
    } else {
        console.warn("Item not found.");
    }
};