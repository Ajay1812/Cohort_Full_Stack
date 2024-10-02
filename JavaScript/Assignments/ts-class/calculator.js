"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculator = calculator;
function calculator(first, second, operator) {
    if (operator === "add") {
        return first + second;
    }
    else if (operator === "sub") {
        return first - second;
    }
    else if (operator === "mul") {
        return first * second;
    }
    else if (operator === "div") {
        return first / second;
    }
    else {
        return -1;
    }
}
console.log(calculator(10, 2021321, "mul"));
