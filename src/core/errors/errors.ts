import Shop from "../../data/shop";
import { simulatedUser } from "../../simulator/simulator";
import { User } from "../../utils/util";

export const handleItemNotFound = (selectedItem: string) => {
    const data = Shop.find((item) => item.item === selectedItem);
    if (!data) {
        return {
            success: false,
            msg: "Item not found."
        }
    }

    return {
        success: true,
        msg: "Item found."
    }
};

export const handleLowBalance = (userId: number, price: number) => {
    const data = simulatedUser(userId);

    if (!data) {
        console.warn("User not found.");
        return {
            success: false,
            msg: "User not found."
        }
    }

    if (data.balance < price) {
        return {
            success: false,
            msg: "Insufficient balance."
        }
    }

    return {
        success: true,
        msg: "Sufficient balance."
    }
};