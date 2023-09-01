import { simulatedUser, simulatedShop } from "../../simulator/simulator";
import { clearUserCart, getUserBalance, getUserCart, getUserInventory, updateUserBalance, updateUserInventory } from "../queries/queries";
import { handleItemNotFound, handleLowBalance } from "../errors/errors";
import { NewItem, Item } from "../../utils/util";

export const addItemToCart = (userId: number, item: string) => {
    return new Promise<string>((resolve, reject) => {
        const findItem = handleItemNotFound(item);
        if (!findItem.success) {
            reject(findItem.msg);
            return;
        }

        try {
            const newItem: NewItem = { item: item, price: getItemPrice(item) };
            const cart: NewItem[] = getUserCart(userId) || [];
            cart.push(newItem);

            resolve(`Successfully added ${item} to your cart!`);
        } catch (error) {
            reject("Error adding item to cart.");
            throw error;
        }
    });
};

export const getItemPrice = (item: string) => {
    const data = simulatedShop(item);
    if (data) {
        return data.price;
    }

    return "Item not found.";
};

export const removeItemFromCart = (userId: number, item: string) => {
    const userCart = simulatedUser(userId);
    const index = userCart?.cart.findIndex(cartItem => cartItem.item === item);

    if (index !== undefined && index !== -1) {
        userCart?.cart.splice(index, 1)[0];
        return `Successfully removed ${item} from your cart.`;
    } else {
        return `${item} does not exist in your cart.`;
    }
};

export const checkOutCart = (userId: number) => {
    const cart = getUserCart(userId) || [];
    const total = calculateTotal(userId);

    processPurchase(userId, cart, total);
};

export const calculateTotal = (userId: number) => {
    let total = 0;
    
    const userCart = getUserCart(userId);
    if (userCart) {
        for (const cartItem of userCart) {
            total += cartItem.price;
        }
    }

    return total;
}

export const processPurchase = (userId: number, cart: Item[], total: number) => {
    try {
        const userBalance = handleLowBalance(userId, total);
        if (!userBalance.success) {
            console.log(userBalance.msg);
            return;
        }

        clearUserCart(userId);
        updateUserBalance(userId, -total);

        for (const item of cart) {
            updateUserInventory(userId, item);
        }

        console.log(`Successfully purchased items for ${total} coins.`);
        console.log("Your balance: ", getUserBalance(userId));
        console.log("Your inventory: ", getUserInventory(userId));
    } catch (error) {
        console.error(`Purchased failed ${error}`);
        throw error;
    }
};