import * as readline from "readline";
import { simulatedShop } from "./simulator/simulator";
import { addItemToCart, checkOutCart, getUserById } from "./core";
import Shop from "./data/shop";

console.log("Initialising...");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const displayShop = () => {
    console.log("Pick out an item from the shop by typing its name");

    for (const item of Shop) {
        console.log(item.item, "-", item.price);
    }
};

const shoppingCart = (userId: number) => {
    displayShop();

    rl.question("Enter an item to purchase: ", (itemName: string) => {
        const item = simulatedShop(itemName);
        if (item) {
            addItemToCart(userId, itemName)
                .then((msg) => {
                    console.log(msg);
                    checkOutCart(userId);
                })
                .catch((error) => {
                    console.log("An unexpected error occured.", error);
                    throw error;
                });
        }

        rl.close();
    });
}

rl.question("Enter User ID: ", (uid) => {
    const userId = parseInt(uid, 10);
    const user = getUserById(userId);

    if (user) {
        shoppingCart(userId);
    } else {
        console.log("User not found.");
        rl.close();
    }
});