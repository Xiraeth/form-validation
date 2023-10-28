"use strict";

const submit = document.querySelector('input[type="submit"]');
const inputFields = document.querySelectorAll("input");
const emailInput = document.querySelector("#email");
const countryInput = document.querySelector("#country");
const zipcodeInput = document.querySelector("#zipcode");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirmPassword");
const passwordWarning = document.querySelector(".passwordWarning");
const showPassIcon = document.querySelector(".passIcon");
const showConfirmPassIcon = document.querySelector(".confirmPassIcon");
const submitBtn = document.querySelector("#submit");
const finalMsg = document.querySelector(".finalMessage");

let canSubmit = false;
let passVisible = false;
let confirmPassVisible = false;
let counter = 0;

showPassIcon.addEventListener("click", function (e) {
  if (!passVisible) {
    passwordInput.type = "text";
    showPassIcon.className = "fa-solid fa-eye-slash passIcon";
    passVisible = true;
  } else {
    passwordInput.type = "password";
    showPassIcon.className = "fa-solid fa-eye passIcon";
    passVisible = false;
  }
});

showConfirmPassIcon.addEventListener("click", function (e) {
  if (!confirmPassVisible) {
    confirmPasswordInput.type = "text";
    showConfirmPassIcon.className = "fa-solid fa-eye-slash confirmPassIcon";
    confirmPassVisible = true;
  } else {
    confirmPasswordInput.type = "password";
    showConfirmPassIcon.className = "fa-solid fa-eye confirmPassIcon";
    confirmPassVisible = false;
  }
});

function checkEmailValidity(e) {
  const regex = /\w{1,20}@(gmail|yahoo|hotmail)\.(com|gr|fr|de|gov)$/gm;
  const errorMsg = "Enter a valid email address";
  checkError(regex, errorMsg, e, emailInput);
}

function checkCountryValidity(e) {
  const regex = /[a-zA-Z]{3,14}/;
  const errorMsg = "Enter a valid country";
  checkError(regex, errorMsg, e, countryInput);
}

function checkZipcodeValidity(e) {
  const regex = /\d{5}/;
  const errorMsg = "Enter a valid zipcode (5 digit number)";
  checkError(regex, errorMsg, e, zipcodeInput);
}

// This one has to be slightly different
function checkPasswordValidity(e) {
  const specialCharactersRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>?`~]/g;
  const numbersRegex = /\d/g;
  const capitalsRegex = /[A-Z]/g;
  const errorMsgElement =
    e.target.parentElement.querySelector(".inputWarnings");

  if (!specialCharactersRegex.test(passwordInput.value)) {
    errorMsgElement.style.opacity = "1";
    passwordInput.setCustomValidity(
      "Password needs to contain at least one symbol"
    );
    errorMsgElement.textContent = passwordInput.validationMessage;
  } else if (!numbersRegex.test(passwordInput.value)) {
    errorMsgElement.style.opacity = "1";
    passwordInput.setCustomValidity(
      "Password needs to contain at least one number"
    );
    errorMsgElement.textContent = passwordInput.validationMessage;
  } else if (!capitalsRegex.test(passwordInput.value)) {
    errorMsgElement.style.opacity = "1";
    passwordInput.setCustomValidity(
      "Password needs to contain at least one capital letter"
    );
    errorMsgElement.textContent = passwordInput.validationMessage;
  } else if (passwordInput.value.length < passwordInput.minLength) {
    errorMsgElement.style.opacity = "1";
    passwordInput.setCustomValidity(
      "Password needs to be at least at least 6 characters long"
    );
    errorMsgElement.textContent = passwordInput.validationMessage;
  } else if (passwordInput.value.length > passwordInput.maxLength) {
    errorMsgElement.style.opacity = "1";
    passwordInput.setCustomValidity(
      "Password needs to be a maximum of 16 characters long"
    );
    errorMsgElement.textContent = passwordInput.validationMessage;
  } else {
    errorMsgElement.style.opacity = "0";
    passwordInput.setCustomValidity("");
  }
}

function confirmPasswordValidity(e) {
  const errorMsgElement = document.querySelector(".confirmPasswordWarningMsg");

  if (passwordInput.value == confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity("");
    errorMsgElement.style.opacity = "0";
  } else {
    confirmPasswordInput.setCustomValidity("Passwords need to match");
    errorMsgElement.style.opacity = "1";
    errorMsgElement.textContent = confirmPasswordInput.validationMessage;
  }
}

function checkError(regexp, errorMsg, e, inputField) {
  const regex = regexp;
  const msg = e.target.parentElement.querySelector(".inputWarnings");

  if (regex.test(inputField.value)) {
    inputField.classList.add("valid");
    inputField.classList.remove("invalid");
    msg.style.opacity = "0";
    inputField.setCustomValidity("");
  } else {
    inputField.classList.remove("valid");
    inputField.classList.add("invalid");
    msg.style.opacity = "1";
    inputField.setCustomValidity(errorMsg);
  }
  msg.textContent = inputField.validationMessage;
}

function checkOverallValidity() {
  if (
    emailInput.checkValidity() &&
    countryInput.checkValidity() &&
    zipcodeInput.checkValidity() &&
    passwordInput.checkValidity() &&
    confirmPasswordInput.checkValidity()
  )
    canSubmit = true;
  else canSubmit = false;
}

emailInput.addEventListener("input", checkEmailValidity);
countryInput.addEventListener("input", checkCountryValidity);
zipcodeInput.addEventListener("input", checkZipcodeValidity);
passwordInput.addEventListener("input", (e) => {
  checkPasswordValidity(e);
  confirmPasswordValidity(e);
});
confirmPasswordInput.addEventListener("input", confirmPasswordValidity);
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  checkOverallValidity();
  if (canSubmit)
    flashMsg(
      finalMsg,
      "Congratsulations, you can fill in a basic form.",
      "mediumspringgreen"
    );
  else {
    if (counter === 0) {
      flashMsg(
        finalMsg,
        "Why are you submitting when you see there are still invalid fields..?",
        "crimson"
      );
      counter++;
    } else if (counter > 0 && counter < 3) {
      flashMsg(finalMsg, "Still trying? Really?", "crimson");
      counter++;
    } else {
      flashMsg(finalMsg, "Ok I'm done do whatever you want", "crimson");
    }
  }
});

function flashMsg(el, message, color) {
  el.style.color = color;
  el.textContent = message;
  el.style.opacity = "1";
  setTimeout(function () {
    el.style.opacity = "0";
  }, 2000);
}
