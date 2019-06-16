

var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var conneciton = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

conneciton.connect(function (err) {
    // console.log("Connection working!")
    if (err) throw err;
    initapp();
})

// initapp - create query, use query, display query return

function initapp() {
    conneciton.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        promtCustomerforItem(res);
    });
}


//order - use inquirer to prompt the user to enter id of the product to order

function promtCustomerforItem(inventory) {
    inquirer.prompt([
        {
            type: "input",
            name: "itemID",
            message: "Which Item ID would you like to purchase? (press Q to exit)",
            validate: function (val) {
                return !isNaN(val) || val.toLowerCase() === "q";
            }
        }
    ]).then(function (val) {
        console.log(val);
        checkIfExit(val.itemID);
        var choiceID = parseInt(val.itemID);
        var product = checkInventory(choiceID, inventory);

        if (product) {
            promtCustomerforQty(product);
        } else {
            console.log("Item not found!");
            console.log(product);
            // initapp();
        }
    })
};

function checkInventory(choiceID, inventory) {
    for (let i = 0; i < inventory.length; i++) {

        if (inventory[i].item_ID === choiceID) {
            return inventory[i];
        }
    } return null;
}

function checkIfExit(userInput) {
    if (userInput.toLowerCase() === "q") {
        console.log("Thanks for shopping with us!");
        process.exit(0);
    }
}

function promtCustomerforQty(product) {
    inquirer.prompt([
        {
            type: "input",
            name: "QTY",
            message: "Please enter quantity (press Q to exit)",
            validate: function (val) {
                return val > 0 || val.toLowerCase() === "q";
            }
        }
    ]).then(function (val) {
        checkIfExit(val.QTY);
        var quantity = parseInt(val.QTY);
        if (quantity > product.qty) {
            console.log("Insufficient uantity!");
            initapp();
        } else {
            completePurchase(product, quantity);
        }
    });

}

function completePurchase(product, quantity) {
    conneciton.query(
        "UPDATE products SET qty =  qty - ? WHERE item_ID = ?",
        [quantity, product.item_ID],
        function (err, res) {
            console.log("Order placed for " + quantity + " of " + product.product_name);
            initapp();
        });
}


// in then section store user entry to return the item if it is listed in store inventory

//list item and prompt for qty


//function to check if there is enough inventory in store; if not enough notify the user tehre is not enough qty in stock
//if enough sty on hand return the prodcut and qty to confirm purchase or cancel

//if confirm reduce inventory on hand by qty on hand 
