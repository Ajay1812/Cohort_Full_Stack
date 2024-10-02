var Arithmetic;
(function (Arithmetic) {
    Arithmetic[Arithmetic["Add"] = 0] = "Add";
    Arithmetic[Arithmetic["Sub"] = 1] = "Sub";
    Arithmetic[Arithmetic["Div"] = 2] = "Div";
    Arithmetic[Arithmetic["Mul"] = 3] = "Mul";
})(Arithmetic || (Arithmetic = {}));
function calculateSum(a, b, type) {
    console.log(type);
    return a + b;
}
console.log(calculateSum(23, 25, Arithmetic.Add));
