const questionOne = function questionOne(arr) {
  // Implement question 1 here

  let result = {};

  if (arr && Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      if (Number.isInteger(arr[i])) {
        let myBool = true;
        let temp = Math.abs(Math.pow(arr[i], 2) - 7);

        for (let j = 2; j < temp; j++) {
          if (temp % j === 0 || temp === 1) myBool = false;
        }
        result[temp] = myBool;
      }
    }
  }
  return result;
};

const questionTwo = function questionTwo(arr) {
  result = [...new Set(arr)];
  return result;
};

const questionThree = function questionThree(arr) {
  // Implement question 3 here

  let anagramWord = function (input) {
    return input.split("").sort().join("");
  };

  let result = {};
  if (arr) {
    for (let i in arr) {
      let temp = anagramWord(arr[i]);

      if (result[temp] != null) {
        result[temp].push(arr[i]);
      } else {
        result[temp] = [arr[i]];
      }
    }

    for (let i in result) {
      result[i] = [...new Set(result[i])];
      if (result[i].length == 1) {
        delete result[i];
      }
    }
  }
  return result;
};

const questionFour = function questionFour(num1, num2, num3) {
  // Implement question 4 here

  let result = 0;
  let result1 = 1;
  let result2 = 1;
  let result3 = 1;
  for (let i = num1; i > 1; i--) {
    result1 *= i;
  }
  for (let i = num2; i > 1; i--) {
    result2 *= i;
  }
  for (let i = num3; i > 1; i--) {
    result3 *= i;
  }
  result = (result1 + result2 + result3) / ((num1 + num2 + num3) / 3);
  return Math.floor(result);
};

module.exports = {
  firstName: "Harsh",
  lastName: "Agrawal",
  studentId: "10475285",
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
