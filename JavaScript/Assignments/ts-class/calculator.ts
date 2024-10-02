export function calculator(
  first: number,
  second: number,
  operator: "add" | "sub" | "mul" | "div",
): number {
  if (operator === "add") {
    return first + second;
  } else if (operator === "sub") {
    return first - second;
  } else if (operator === "mul") {
    return first * second;
  } else if (operator === "div") {
    return first / second;
  } else {
    return -1;
  }
}

console.log(calculator(10, 2021321, "mul"));
