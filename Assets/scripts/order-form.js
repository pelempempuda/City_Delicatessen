window.onload = initialize();

function initialize() {
    var todayDate = new Date();
    document.getElementById('currentDate').innerHTML = todayDate;
}

function calcPizza() {

    var pizzaType, pizzaSize, numOfPizzas, pizzaToppings;
    var pizzaCost = 0;
    var toppingCost = 0;
    var toppingArray = [];
    var pizza = {};

    pizzaType = document.querySelector('input[name = "pizzaType[]"]:checked').value;

    pizzaSize = document.getElementById('pizzaSize').value;

    switch (pizzaSize) {
        case 'Small':
            pizzaCost = 8.50;
            break;
        case 'Medium':
            pizzaCost = 11.50;
            break;
        case 'Large':
            pizzaCost = 14.00;
            break;
        case 'Extra Large':
            pizzaCost = 16.50;
            break;
    }

    numOfPizzas = document.getElementById('numOfPizza').value;

    pizzaToppings = document.getElementsByName('pizzaToppings[]');

    for(var pt = 0; pt < pizzaToppings.length; pt++) {

        if( pizzaToppings[pt].checked == true ) {
            toppingCost += 1.75;
            toppingArray.push( pizzaToppings[pt].value )
        }
    }

    pizzaCost = (pizzaCost + toppingCost) * numOfPizzas;

    pizza.quantity = numOfPizzas;
    pizza.size = pizzaSize;
    pizza.type = pizzaType;
    pizza.cost = pizzaCost.toFixed(2);
    pizza.toppings = toppingArray;
    
    return pizza;
}

function calcSandwich() {
    var sandwichType,  numOfSandwiches;
    var sandwichCost = 0;
    var sandwich = {};

    sandwichType = document.querySelector('input[name = "sandwichType[]"]:checked').value;
    
    switch (sandwichType) {
        case 'All Garden Vegetarian':
            sandwichCost = 7.50;
            break;
        case 'Big Beef on a Bun':
            sandwichCost = 8.50;
            break;
        case 'Mixed Grill':
            sandwichCost = 9.50;
            break;
        case 'Grilled Pork':
            sandwichCost = 9.50;
            break;
    }
    numOfSandwiches = document.getElementById('numOfSandwich').value;

    sandwichCost = numOfSandwiches * sandwichCost;

    sandwich.quantity = numOfSandwiches;
    sandwich.type = sandwichType;
    sandwich.cost = sandwichCost.toFixed(2);

    return sandwich;
}

function calcDrinks() {
    var drinkType, drinkSize, numOfDrinks;
    var drinkCost = 0;
    var drinks = {};

    drinkType = document.querySelector('input[name = "drinkType[]"]:checked').value;

    drinkSize = document.getElementById('drinkSize').value;

    switch (drinkSize) {
        case 'Small':
            drinkCost = 1.25;
            break;
        case 'Medium':
            drinkCost = 1.75;
            break;
        case 'Large':
            drinkCost = 2.00;
            break;
    }
    numOfDrinks = document.getElementById('numOfDrinks').value;

    drinkCost = drinkCost * numOfDrinks;

    drinks.quantity = numOfDrinks;
    drinks.type = drinkType;
    drinks.size = drinkSize;
    drinks.cost = drinkCost.toFixed(2);

    return drinks;
}

function calcOrder() {
    
    var pizza = calcPizza();
    var sandwich = calcSandwich();
    var drinks = calcDrinks();
    

    dispOrder(pizza, sandwich, drinks);
}

function dispOrder(pizzaObj, sandwichObj, drinksObj) {
    
    var fName, lName, address, phone;
    var receipt = '';
    

    fName = document.getElementById('firstName').value;
    lName = document.getElementById('lastName').value;
    address = document.getElementById('address').value;
    phone = document.getElementById('phone').value;

    receipt += '<h4> Customer Order </h4>';
    receipt += '<p><b> Full Name:</b> ' + fName + ' ' + lName + '</p>';
    receipt += '<p><b> Address: </b> ' + address + '</p>';
    receipt += '<p><b> Phone Number: </b> ' + phone + '</p>';
    receipt += '<h4>Order Details</h4>';
    receipt += '<p>' + pizzaObj.quantity + ' ' + pizzaObj.size + ' ' + pizzaObj.type + ' Pizza ' + '$' + pizzaObj.cost + '</p>';
    receipt += '<ul>';

    for ( var pt = 0; pt < pizzaObj.toppings.length; pt++) {
        receipt += '<li>' + pizzaObj.toppings[pt] + '</li>';
    }
    receipt += '</ul>'

    receipt += '<p>' + sandwichObj.quantity + ' ' + sandwichObj.type + ' Sandwiches ' + '$' + sandwichObj.cost + '</p>';
    receipt += '<p>' + drinksObj.quantity + ' ' + drinksObj.size + ' ' + drinksObj.type + ' ' + '$' + drinksObj.cost + '</p>';
    var total = (parseFloat(pizzaObj.cost) + parseFloat(sandwichObj.cost) + parseFloat(drinksObj.cost)).toFixed(2);
    receipt += '<p> Total Cost: $' + total + '</p>';
    
    document.getElementById('displayOrder').innerHTML= receipt;
}