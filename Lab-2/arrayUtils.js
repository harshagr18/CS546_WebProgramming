function checkIsProperArray(val) {
  if (!val) {
    throw `No input given.`;
  }
  if (val.length == 0) {
    throw `Empty array given.`;
  }
  if (!Array.isArray(val)) {
    throw `Input is not array.`;
  }
}

function checkIsProperNumber(val) {
  if (typeof val !== "number") {
    throw `One of the elements is not a number`;
  }

  if (isNaN(val)) {
    throw `One of the elements is NaN`;
  }
}

function average(array) {
  checkIsProperArray(array);
  let sum = 0;
  let length = 0;
  for (let i = 0; i < array.length; i++) {
    checkIsProperArray(array[i]);
    for (let j = 0; j < array[i].length; j++) {
      checkIsProperNumber(array[i][j]);
      sum = sum + array[i][j];
    }
    length += array[i].length;
  }
  return sum / length;
}

function modeSquared(array) {
  checkIsProperArray(array);
  let freq = {};
  let max = 0;
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    checkIsProperNumber(array[i]);
    freq[array[i]] = (freq[array[i]] || 0) + 1;

    if (freq[array[i]] > max) {
      max = freq[array[i]];
    }
  }
  for (let k in freq) {
    if (freq[k] == max) {
      sum = sum + Math.pow(k, 2);
    }
  }
  return sum;
}

function medianElement(array) {
  checkIsProperArray(array);
  let ogArray = [...array];
  array.sort();
  let median = {};
  let temp = 0;
  for (let i in array) {
    checkIsProperNumber(array[i]);
  }
  if (array.length % 2 == 0) {
    temp = (array[array.length / 2] + array[array.length / 2 - 1]) / 2;
    median[temp] = ogArray.indexOf(array[array.length / 2]);
  } else {
    temp = array[(array.length - 1) / 2];
    median[temp] = ogArray.indexOf(temp);
  }
  return median;
}

function merge(arrayOne, arrayTwo) {
  checkIsProperArray(arrayOne);
  checkIsProperArray(arrayTwo);
  array = arrayOne.concat(arrayTwo);

  let capArray = [];
  let smallArray = [];
  let numArray = [];

  for (k in array) {
    if (!(typeof array[k] == "string" || typeof array[k] == "number")) {
      throw `Entered value is not a character or number.`;
    }

    if (typeof array[k] == "string" && array[k].length > 1) {
      throw `Longer than 1 length string entered`;
    }
    if (
      String(array[k]).charCodeAt(0) >= 48 &&
      String(array[k]).charCodeAt(0) <= 57
    ) {
      numArray.push(array[k]);
    }
    if (
      String(array[k]).charCodeAt(0) >= 97 &&
      String(array[k]).charCodeAt(0) <= 122
    ) {
      smallArray.push(array[k]);
    }
    if (
      String(array[k]).charCodeAt(0) >= 65 &&
      String(array[k]).charCodeAt(0) <= 90
    ) {
      capArray.push(array[k]);
    }
  }
  smallArray.sort();
  capArray.sort();
  numArray.sort();

  smallArray = smallArray.concat(capArray);
  smallArray = smallArray.concat(numArray);
  return smallArray;
}

module.exports = {
  average,
  modeSquared,
  medianElement,
  merge,
};
