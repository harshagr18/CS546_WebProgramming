const lab1 = require("./lab1");

console.log(lab1.questionOne([2]));
console.log(lab1.questionOne([5, 3, 10]));
console.log(lab1.questionOne([]));
console.log(lab1.questionOne());
console.log(lab1.questionOne([5, -5]));

console.log(lab1.questionTwo([1, 2, 3, 2, 1]));
console.log(lab1.questionTwo([1, 1, 1, 1, 1, 1]));
console.log(lab1.questionTwo([1, "1", 1, "1", 2]));
console.log(lab1.questionTwo([3, "a", "b", 3, "1"]));
console.log(lab1.questionTwo([]));

console.log(lab1.questionThree(["bar", "car", "car", "arc"]));
console.log(lab1.questionThree(["race", "care", "foo", "foo", "foo"]));
console.log(lab1.questionThree(["foo", "bar", "test", "Patrick", "Hill"]));
console.log(lab1.questionThree([]));
console.log(
  lab1.questionThree([
    "abc",
    "bac",
    "cba",
    "bca",
    "art",
    "rat",
    "tra",
    "rta",
    "atr",
    "foo",
    "foo",
    "cab",
  ])
);

console.log(lab1.questionFour(1, 3, 2));
console.log(lab1.questionFour(2, 5, 6));
console.log(lab1.questionFour(7, 4, 2));
console.log(lab1.questionFour(0, 2, 3));
console.log(lab1.questionFour(3, 3, 3));
