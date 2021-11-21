function checkIsProperString(val) {
  if (!val) {
    throw `No input passed`;
  }
  if (typeof val !== "string") {
    throw `Not a string`;
  }

  if (val.length == 0) {
    throw `Length of string is 0`;
  }
  if (val.trim().length == 0) {
    throw `String is only spaces`;
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

function sortString(string) {
  checkIsProperString(string);
  let array = string.split("");
  let capArray = [];
  let smallArray = [];
  let numArray = [];
  let symArray = [];
  let spaces = [];

  for (k in array) {
    if (
      String(array[k]).charCodeAt(0) >= 48 &&
      String(array[k]).charCodeAt(0) <= 57
    ) {
      numArray.push(array[k]);
    } else if (
      String(array[k]).charCodeAt(0) >= 97 &&
      String(array[k]).charCodeAt(0) <= 122
    ) {
      smallArray.push(array[k]);
    } else if (
      String(array[k]).charCodeAt(0) >= 65 &&
      String(array[k]).charCodeAt(0) <= 90
    ) {
      capArray.push(array[k]);
    } else if (String(array[k]) == " ") spaces.push(array[k]);
    else symArray.push(array[k]);
  }

  smallArray.sort();
  capArray.sort();
  numArray.sort();
  capArray = capArray.concat(smallArray);
  capArray = capArray.concat(symArray);
  capArray = capArray.concat(numArray);
  capArray = capArray.concat(spaces);

  return capArray.join("");
}

function replaceChar(string, idx) {
  checkIsProperString(string);
  checkIsProperNumber(idx);
  if (idx > string.length - 2 || idx == 0) {
    throw `Index value passed is out of range`;
  }

  let letter = string[idx];
  let letterBefore = string[idx - 1];
  let letterAfter = string[idx + 1];
  let array = string.split("");
  let i = array.indexOf(letter) + 1;
  let temp = 0;

  for (i; i < array.length; i++) {
    if (array[i] === letter) {
      if (temp % 2 == 0) {
        array[i] = letterBefore;
        temp = temp + 1;
      } else {
        array[i] = letterAfter;
        temp = temp + 1;
      }
    }
  }
  return array.join("");
}

function mashUp(string1, string2, char) {
  checkIsProperString(string1);
  checkIsProperString(string2);
  checkIsProperString(char);
  if (char.length != 1) {
    throw `Entered character is not of length 1`;
  }
  if (string1.length > string2.length) {
    while (string1.length != string2.length) {
      string2 += char;
    }
  } else if (string2.length > string1.length) {
    while (string2.length != string1.length) {
      string1 += char;
    }
  }
  let temp = 0;
  let temp1 = 0;
  let final = "";
  for (let i = 0; i < 2 * string2.length; i++) {
    if (i % 2 == 0) {
      final += string1[temp];
      temp = temp + 1;
    } else {
      final += string2[temp1];
      temp1 = temp1 + 1;
    }
  }
  return final;
}

module.exports = {
  sortString,
  replaceChar,
  mashUp,
};
