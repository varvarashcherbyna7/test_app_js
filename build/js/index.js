"use strict";

var inputText = document.getElementById("resultInput");
console.log(" inputText ", inputText.value);

var cleanString = function cleanString(str) {
  return str // Match zero or more digits, followed by a decimal,
  // followed by more digit and decimal characters
  // For everything past the first decimal, replace decimals with the empty string
  .replace(/(\d*\.)([\d.]+)/g, function (_, g1, g2) {
    return g1 + g2.replace(/\./g, '');
  }) // Match 2 or more operators, capture the last operator in a group
  // Replace with the last operator captured
  .replace(/([-+/*]){2,}/g, '$1').replace(/[a-zA-Z]/g, '');
};

function clear1() {
  inputText.value = "";
}

function calc() {
  var stringWithNumberAndMath = cleanString(inputText.value);
  console.log("stringWithNumberAndMath ", stringWithNumberAndMath);
  inputText.value = eval(stringWithNumberAndMath);
}

function press(x) {
  inputText.value += x;
}
//# sourceMappingURL=index.js.map
