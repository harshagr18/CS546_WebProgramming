(function () {
  console.log("hi");
  const palindromeForm = document.getElementById("palindrome-form");
  let myUl = document.getElementById("attempts");
  let errorDiv = document.getElementById("error");
  let resultDiv = document.getElementById("result");
  const myString = document.getElementById("phrase");

  if (palindromeForm) {
    palindromeForm.addEventListener("submit", (event) => {
      errorDiv.hidden = true;
      resultDiv.hidden = true;
      holding = myString.value;
      myString.value = myString.value.replace(/[^0-9a-z]/gi, "").toLowerCase();
      event.preventDefault();
      if (myString.value.trim()) {
        errorDiv.hidden = true;
        let li = document.createElement("li");
        li.innerHTML = holding;
        myUl.appendChild(li);
        if (myString.value === myString.value.split("").reverse().join("")) {
          li.className = "is-palindrome";
          resultDiv.hidden = false;
          resultDiv.innerHTML = "Given string is a palindrome!";
        } else {
          li.className = "not-palindrome";
          resultDiv.hidden = false;
          resultDiv.innerHTML = "Given string is not a palindrome!";
        }
      } else {
        errorDiv.hidden = false;
        resultDiv.hidden = true;
        errorDiv.innerHTML = "Please enter an alphanumeric value";
      }
      palindromeForm.reset();
      myString.focus();
    });
  }
})();
