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

function checkIsProperObject(val) {
  if (typeof val !== "object" || Array.isArray(val) || val === null) {
    throw `Element was not an object`;
  }
}

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

function computeObjects(object, func) {
  checkIsProperArray(object);

  if (!(func && {}.toString.call(func) === "[object Function]")) {
    throw `Second element is not a function`;
  }

  final = {};
  for (i in object) {
    checkIsProperObject(object[i]);
    let size = 0;
    for (k in object[i]) {
      size = size + 1;
    }
    if (size == 0) {
      throw `Object is empty.`;
    }

    for (j in object[i]) {
      checkIsProperNumber(object[i][j]);
      if (final[j] != null) {
        final[j] += func(object[i][j]);
      } else {
        final[j] = func(object[i][j]);
      }
    }
  }
  return final;
}

function commonKeys(obj1, obj2) {
  if (!obj1 || !obj2) {
    throw `One of the parameters wasn't passed`;
  }
  checkIsProperObject(obj1);
  checkIsProperObject(obj2);
  let size1 = 0;
  let size2 = 0;
  for (k in obj1) {
    size1 = size1 + 1;
  }
  for (k in obj2) {
    size2 = size2 + 1;
  }
  if (size1 == 0 || size2 == 0) {
    throw `One of the objects is empty.`;
  }

  final = {};
  let keys = [];
  for (i in obj1) {
    if (i in obj2) keys.push(i);
  }

  for (i = 0; i < keys.length; i++) {
    if (
      typeof obj1[keys[i]] === "object" ||
      typeof obj2[keys[i]] === "object"
    ) {
      for (k in obj1[keys[i]]) {
        if (obj1[keys[i]][k] === obj2[keys[i]][k]) {
          if (final[keys[i]] != null) {
            final[keys[i]].push(obj1[keys[i]]);
          } else {
            final[keys[i]] = obj1[keys[i]];
          }
        }
      }
    } else {
      if (obj1[keys[i]] === obj2[keys[i]]) {
        if (final[keys[i]] != null) {
          final[keys[i]].push(obj1[keys[i]]);
        } else {
          final[keys[i]] = obj1[keys[i]];
        }
      }
    }
  }
  return final;
}

function flipObject(object) {
  final = {};
  checkIsProperObject(object);
  let size = 0;
  for (k in object) {
    size = size + 1;
  }
  if (size == 0) {
    throw `Object is empty.`;
  }
  for (i in object) {
    if (Array.isArray(object[i])) {
      for (j in object[i]) {
        final[object[i][j]] = i;
      }
    } else if (typeof object[i] === "object") {
      let temp = {};
      for (k in object[i]) {
        temp[object[i][k]] = k;
        final[i] = temp;
      }
    } else {
      final[object[i]] = i;
    }
  }
  return final;
}

module.exports = {
  computeObjects,
  commonKeys,
  flipObject,
};
