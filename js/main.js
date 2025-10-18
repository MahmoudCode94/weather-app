var logOutButton = document.querySelector("#logout-button");
var signUpNameInput = document.querySelector(".signup-name"); //
var signUpEmailInput = document.querySelector(".signup-email");
var signUpPassInput = document.querySelector(".signup-pass");
var signUpButton = document.querySelector("#signup-button");
var signUpErorr = document.querySelector("#signup-erorr");

var users = [];

if (localStorage.getItem("User")) {
  users = JSON.parse(localStorage.getItem("User"));
} else {
  users = [];
}

if (logOutButton) {
  logOutButton.addEventListener("click", function () {
    localStorage.removeItem("currentUser"); // ✅ امسح المستخدم الحالي
    window.location.href = "./index.html"; // ✅ رجع المستخدم لصفحة اللوج إن
  });
}

function validateSignUpName() {
  var name = signUpNameInput.value.trim();
  var feedback =
    signUpNameInput.parentElement.querySelector(".invalid-feedback");
  var namePattern = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;

  var nameWithoutSpaces = name.replace(/\s+/g, "");

  if (name === "") {
    feedback.textContent = "Name is required.";
    signUpNameInput.classList.add("is-invalid");
    signUpNameInput.classList.remove("is-valid");
    return false;
  } else if (
    !namePattern.test(name) ||
    nameWithoutSpaces.length < 3 ||
    nameWithoutSpaces.length > 20
  ) {
    feedback.textContent =
      "Name must contain only letters and be 3–20 characters long.";
    signUpNameInput.classList.add("is-invalid");
    signUpNameInput.classList.remove("is-valid");
    return false;
  } else {
    signUpNameInput.classList.add("is-valid");
    signUpNameInput.classList.remove("is-invalid");
    return true;
  }
}
if (signUpNameInput) {
  signUpNameInput.addEventListener("input", validateSignUpName);
}

function validateSignUpEmail() {
  var email = signUpEmailInput.value.trim();
  var feedback =
    signUpEmailInput.parentElement.querySelector(".invalid-feedback");
  var emailPattern = /^[A-Za-z][A-Za-z0-9_]*@[A-Za-z0-9]+\.[cC][oO][mM]$/;

  if (email === "") {
    feedback.textContent = "Email is required.";
    signUpEmailInput.classList.add("is-invalid");
    signUpEmailInput.classList.remove("is-valid");
    return false;
  } else if (!emailPattern.test(email)) {
    feedback.textContent =
      "Please enter a valid email address (example@domain.com).";
    signUpEmailInput.classList.add("is-invalid");
    signUpEmailInput.classList.remove("is-valid");
    return false;
  } else {
    signUpEmailInput.classList.add("is-valid");
    signUpEmailInput.classList.remove("is-invalid");
    return true;
  }
}
if (signUpEmailInput) {
  signUpEmailInput.addEventListener("input", validateSignUpEmail);
}

function validateSignUpPass() {
  var pass = signUpPassInput.value.trim();
  var feedback =
    signUpPassInput.parentElement.querySelector(".invalid-feedback");
  var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{9,}$/;

  if (pass === "") {
    feedback.textContent = "Password is required.";
    signUpPassInput.classList.add("is-invalid");
    signUpPassInput.classList.remove("is-valid");
    return false;
  } else if (!passwordPattern.test(pass)) {
    feedback.textContent = "Password must be 9+ chars with upper & lower case.";
    signUpPassInput.classList.add("is-invalid");
    signUpPassInput.classList.remove("is-valid");
    return false;
  } else {
    signUpPassInput.classList.add("is-valid");
    signUpPassInput.classList.remove("is-invalid");
    return true;
  }
}
if (signUpPassInput) {
  signUpPassInput.addEventListener("input", validateSignUpPass);
}

function signUp() {
  var validFeedBack = document.querySelector("#signup-success");
  var loginLink = document.querySelector("#login-link");
  var signupEmailErorr = document.querySelector("#signupEmail-erorr");
  var signUpErorr = document.querySelector("#signup-erorr");

  if (validateSignUpName() && validateSignUpEmail() && validateSignUpPass()) {
    var emailExists = false;
    for (var i = 0; i < users.length; i++) {
      if (
        signUpEmailInput.value.trim().toLowerCase() ===
        users[i].userEmail.toLowerCase()
      ) {
        emailExists = true;
        break;
      }
    }
    if (emailExists) {
      signupEmailErorr.classList.remove("d-none");
      signupEmailErorr.classList.add("d-block");
      if (validFeedBack) validFeedBack.classList.add("d-none");
      return;
    }
    users.push({
      userName: signUpNameInput.value,
      userEmail: signUpEmailInput.value,
      userPassword: signUpPassInput.value,
    });
    localStorage.setItem("User", JSON.stringify(users));
    if (validFeedBack) {
      validFeedBack.classList.remove("d-none");
      validFeedBack.classList.add("d-block");
    }
    if (signupEmailErorr) signupEmailErorr.classList.add("d-none");
    if (signUpErorr) signUpErorr.classList.add("d-none");
    if (loginLink) {
      loginLink.classList.add("text-success", "fw-bolder");
    }
    clearInputs();
  } else {
    if (signUpErorr) {
      signUpErorr.classList.remove("d-none");
      signUpErorr.classList.add("d-block");
    }
  }
}
if (signUpButton) {
  signUpButton.addEventListener("click", signUp);
}

function clearInputs() {
  signUpNameInput.value = "";
  signUpEmailInput.value = "";
  signUpPassInput.value = "";
  signUpNameInput.classList.remove("is-valid");
  signUpEmailInput.classList.remove("is-valid");
  signUpPassInput.classList.remove("is-valid");
}

// ---------------------------------------
var logInButton = document.querySelector("#login-button");
var logInEmailInput = document.querySelector(".login-email");
var logInpassInput = document.querySelector(".login-pass");

function validateLogInEmail() {
  var email = logInEmailInput.value.trim();
  var emailPattern = /^[A-Za-z][A-Za-z0-9_]*@[A-Za-z0-9]+\.[cC][oO][mM]$/;

  if (email === "") {
    logInEmailInput.classList.add("is-invalid");
    logInEmailInput.classList.remove("is-valid");
    return false;
  } else if (!emailPattern.test(email)) {
    logInEmailInput.classList.add("is-invalid");
    logInEmailInput.classList.remove("is-valid");
    return false;
  } else {
    logInEmailInput.classList.add("is-valid");
    logInEmailInput.classList.remove("is-invalid");
    return true;
  }
}
if (logInEmailInput) {
  logInEmailInput.addEventListener("input", validateLogInEmail);
}

function validateLogInPass() {
  var pass = logInpassInput.value.trim();
  var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{9,}$/;

  if (pass === "") {
    logInpassInput.classList.add("is-invalid");
    logInpassInput.classList.remove("is-valid");
    return false;
  } else if (!passwordPattern.test(pass)) {
    logInpassInput.classList.add("is-invalid");
    logInpassInput.classList.remove("is-valid");
    return false;
  } else {
    logInpassInput.classList.add("is-valid");
    logInpassInput.classList.remove("is-invalid");
    return true;
  }
}
if (logInpassInput) {
  logInpassInput.addEventListener("input", validateLogInPass);
}

function logIn() {
  var loginError = document.querySelector("#login-error");
  var emailValid = validateLogInEmail();
  var passValid = validateLogInPass();
  if (!emailValid || !passValid) {
    if (loginError) {
      loginError.textContent = "Please enter a valid email and password.";
      loginError.classList.remove("d-none");
      loginError.classList.add("d-block");
    }
    return;
  }
  var email = logInEmailInput.value.trim().toLowerCase();
  var password = logInpassInput.value.trim();
  var users = JSON.parse(localStorage.getItem("User")) || [];
  var emailFeedback =
    logInEmailInput.parentElement.querySelector(".invalid-feedback");
  var passFeedback =
    logInpassInput.parentElement.querySelector(".invalid-feedback");
  var foundUser = users.find(function (user) {
    return user.userEmail.toLowerCase() === email;
  });
  if (!foundUser) {
    logInEmailInput.classList.add("is-invalid");
    logInEmailInput.classList.remove("is-valid");
    emailFeedback.textContent = "This email is not registered.";
    if (loginError) {
      loginError.textContent = "Email not found.";
      loginError.classList.remove("d-none");
      loginError.classList.add("d-block");
    }
    return;
  }
  if (foundUser.userPassword !== password) {
    logInpassInput.classList.add("is-invalid");
    logInpassInput.classList.remove("is-valid");
    passFeedback.textContent = "Incorrect password.";
    if (loginError) {
      loginError.textContent = "Incorrect password.";
      loginError.classList.remove("d-none");
      loginError.classList.add("d-block");
    }
    return;
  }
  logInEmailInput.classList.add("is-valid");
  logInEmailInput.classList.remove("is-invalid");
  logInpassInput.classList.add("is-valid");
  logInpassInput.classList.remove("is-invalid");
  if (loginError) loginError.classList.add("d-none");
  localStorage.setItem("currentUser", JSON.stringify(foundUser));
  window.location.href = "./home.html";
}

if (logInButton) {
  logInButton.addEventListener("click", function (event) {
    event.preventDefault();
    logIn();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      logIn();
    }
  });
}

// ----------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  var currentUser = JSON.parse(localStorage.getItem("currentUser"));
  var homeTitle = document.querySelector("#home h1");
  if (homeTitle) {
    if (currentUser && currentUser.userName) {
      homeTitle.textContent = "Welcome, " + currentUser.userName;
    } else {
      window.location.href = "./index.html";
    }
  }
});