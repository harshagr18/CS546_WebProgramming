const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

// ArrayUtils Functions Testing
// Average Function
try {
  //  Should pass
  const avg1 = arrayUtils.average([
    [1, 3],
    [2, 4, 5],
  ]);
  console.log("average passed successfully");
} catch (e) {
  console.log("average failed test case");
}

try {
  //  Should fail
  const avg2 = arrayUtils.average([[1, 3], []]);
  console.log("average did not get error");
} catch (e) {
  console.log("average failed successfully");
}

// ModeSquared Function

try {
  //  Should pass
  const modeSquare1 = arrayUtils.modeSquared([1, 2, 3, 3, 4]);
  console.log("modeSquared passed successfully");
} catch (e) {
  console.log("modeSquared failed test case");
}

try {
  //  Should fail
  const modeSquare2 = arrayUtils.modeSquared(["guitar", 1, 3, "apple"]);
  console.log("modeSquared did not get error");
} catch (e) {
  console.log("modeSquared failed successfully");
}

// MedianElement function

try {
  //  Should pass
  const median1 = arrayUtils.medianElement([5, 6, 7]);
  console.log("medianElement passed successfully");
} catch (e) {
  console.log("medianElement failed test case");
}

try {
  //  Should fail
  const median2 = arrayUtils.medianElement([1, 2, "nope"]);
  console.log("medianElement did not get error");
} catch (e) {
  console.log("medianElement failed successfully");
}

// Merge Function

try {
  //  Should pass
  const merg1 = arrayUtils.merge([1, 2, 3, "g"], ["d", "a", "s"]);
  console.log("Merge passed successfully");
} catch (e) {
  console.log("Merge failed test case");
}

try {
  //  Should fail
  const merg1 = arrayUtils.merge([1, 2, 3, "ga"], ["d", "a", "s"]);
  console.log("Merge did not get error");
} catch (e) {
  console.log("Merge failed successfully");
}

// StringUtils Functions Testing
// sortString Function

try {
  //  Should pass
  const sort1 = stringUtils.sortString("123 FOO BAR!");
  console.log("SortString passed successfully");
} catch (e) {
  console.log("SortString failed test case");
}

try {
  //  Should fail
  const sort2 = stringUtils.sortString(["Hello", "World"]);
  console.log("SortString did not get error");
} catch (e) {
  console.log("SortString failed successfully");
}

// ReplaceChar function

try {
  //  Should pass
  const rep1 = stringUtils.replaceChar("Daddy", 2);
  console.log("ReplaceChar passed successfully");
} catch (e) {
  console.log("ReplaceChar failed test case");
}

try {
  //  Should fail
  const rep2 = stringUtils.replaceChar("foobar", 0);
  console.log("ReplaceChar did not get error");
} catch (e) {
  console.log("ReplaceChar failed successfully");
}

// mashUp function

try {
  //  Should pass
  const mash1 = stringUtils.mashUp("Patrick", "Hill", "$");
  console.log("mashUp passed successfully");
} catch (e) {
  console.log("mashUp failed test case");
}

try {
  //  Should fail
  const mash1 = stringUtils.mashUp("h", "Hello", 4);
  console.log("mashUp did not get error");
} catch (e) {
  console.log("mashUp failed successfully");
}

// ObjectUtils Functions Testing
// computeObjects Function

const first = { x: 2, y: 3 };
const second = { a: 70, x: 4, z: 5 };
try {
  //  Should pass
  const obj1 = objUtils.computeObjects([first, second], (x) => x * 2);
  console.log("computeObjects passed successfully");
} catch (e) {
  console.log("computeObjects failed test case");
}

try {
  //  Should fail
  const obj2 = objUtils.computeObjects([first, second], "2*2");
  console.log("computeObjects did not get error");
} catch (e) {
  console.log("computeObjects failed successfully");
}

//  commonKeys function

const first2 = { a: 2, b: 4 };
const second2 = { a: 5, b: 4 };
try {
  //  Should pass
  const comK1 = objUtils.commonKeys(first2, second2);
  console.log("commonKeys passed successfully");
} catch (e) {
  console.log("commonKeys failed test case");
}

try {
  //  Should fail
  const comK1 = objUtils.commonKeys(first, "second");
  console.log("commonKeys did not get error");
} catch (e) {
  console.log("commonKeys failed successfully");
}

// flipObject function

try {
  //  Should pass
  const flipO1 = objUtils.flipObject({ a: 3, b: 7, c: { x: 1 } });
  console.log("flipObject passed successfully");
} catch (e) {
  console.log("flipObject failed test case");
}

try {
  //  Should fail
  const flipO2 = objUtils.flipObject({});
  console.log("flipObject did not get error");
} catch (e) {
  console.log("flipObject failed successfully");
}
