const num = 5;
let num2 = 5;

// num++; // error
// num = 6; // error

num2++; // fine
num2 = 6; // fine

const obj = { firstName: "Juan" };
obj.firstName = "Carlos"; // fine
// obj = { firstName: "Carlos" }; // error

const myFunc = function() {
  console.log("function");
};

myFunc(); // prints "function"

let copiedFunc = myFunc;

copiedFunc(); // prints "function"

copiedFunc = "Not a function anymore"; // fine

const car1 = {
  name: "Tesla",
  model: 3,
  price: 32.5,
  printPrice: function() {
    console.log(this.name, "Model", this.model, this.price);
  }
};

car1.print();
