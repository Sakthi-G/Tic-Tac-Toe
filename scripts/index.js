// Dom Elements
let loginImgHolder = document.querySelector(".login-image-holder"),
  signUpEntry = document.querySelector(".sign-up-info"),
  loginEntry = document.querySelector(".login-info"),
  passwordRequirements = document.querySelector(".password-requirement"),
  loginPasswordRequirements = document.querySelector(
    ".password-requirement-login"
  ),
  infoIcon = document.getElementById("info-icon"),
  loginInfoIcon = document.getElementById("info-icon-login"),
  loginButton = document.getElementById("login-button"),
  signUpButton = document.getElementById("sign-up-button"),
  loginPage = document.getElementById("login-page"),
  signUpPage = document.getElementById("sign-up-page"),
  eyeIcon1 = document.getElementById("eye-icon-1"),
  eyeIcon2 = document.getElementById("eye-icon-2"),
  // sign up page input id's
  userName = document.getElementById("username"),
  emailId = document.getElementById("sign-up-email-id"),
  passwordInput = document.getElementById("sign-up-password"),
  confirmPasswordInput = document.getElementById("confirm-password"),
  // login page input id's
  loginEmailId = document.getElementById("login-email-id"),
  loginPassword = document.getElementById("login-password"),
  //snackbar
  loginSnackBar = document.getElementById("login-snackbar"),
  userNotFoundSnackBar = document.getElementById("login-snackbar-notfound"),
  //sign-up-warning's
  emailWarning = document.querySelector(".email-id-warning"),
  userNameWarning = document.querySelector(".username-warning"),
  passwordWarning = document.querySelector(".password-warning"),
  //login-page-warning's
  loginEmailWarning = document.querySelector(".login-email-id-warning"),
  loginPasswordWarning = document.querySelector(".login-password-warning");

let validEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  validPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;

setInterval(() => {
  let firstImage = loginImgHolder.firstElementChild;
  loginImgHolder.removeChild(firstImage);
  loginImgHolder.appendChild(firstImage);
}, 3000);

signUpEntry.addEventListener("click", () => {
  eyeIcon2.classList.add("fa-eye-slash");
  passwordInput.type = "password";
  document.getElementById("sign-up-form").reset();
  emailWarning.innerText =
    passwordWarning.innerText =
    userNameWarning.innerText =
      null;
  passwordRequirements.classList.remove("show");

  loginPage.classList.add("inactive");
  signUpPage.classList.add("active");
  signUpPage.classList.remove("inactive");
});

loginEntry.addEventListener("click", () => {
  eyeIcon1.classList.add("fa-eye-slash");
  loginPassword.type = "password";
  document.getElementById("login-form").reset();
  loginEmailWarning.innerText = null;
  loginPasswordWarning.innerText = null;

  loginPage.classList.add("active");
  loginPage.classList.remove("inactive");
  signUpPage.classList.add("inactive");
});

eyeIcon1.addEventListener("click", () => {
  if (eyeIcon1.classList.contains("fa-eye-slash")) {
    eyeIcon1.classList.remove("fa-eye-slash");
    loginPassword.type = "text";
  } else {
    eyeIcon1.classList.add("fa-eye-slash");
    loginPassword.type = "password";
  }
});

eyeIcon2.addEventListener("click", () => {
  if (eyeIcon2.classList.contains("fa-eye-slash")) {
    eyeIcon2.classList.remove("fa-eye-slash");
    passwordInput.type = "text";
  } else {
    eyeIcon2.classList.add("fa-eye-slash");
    passwordInput.type = "password";
  }
});

loginInfoIcon.addEventListener("click", () => {
  if (loginPasswordRequirements.classList.contains("show"))
    loginPasswordRequirements.classList.remove("show");
  else loginPasswordRequirements.classList.add("show");
});

infoIcon.addEventListener("click", () => {
  if (passwordRequirements.classList.contains("show"))
    passwordRequirements.classList.remove("show");
  else passwordRequirements.classList.add("show");
});

window.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    if (loginPage.classList.contains("inactive")) signUpButton.click();
    else loginButton.click();
  }
});

window.addEventListener("click", (event) => {
  if (
    !loginInfoIcon.contains(event.target) &&
    !loginPasswordRequirements.contains(event.target)
  ) {
    loginPasswordRequirements.classList.remove("show");
  }
});

signUpButton.addEventListener("click", signUpVerification);
loginButton.addEventListener("click", logInVerification);

async function signUpVerification() {
  emailWarning.innerText =
    passwordWarning.innerText =
    userNameWarning.innerText =
      null;

  if (userName.value.length === 0) {
    userNameWarning.innerText = "Please provide Username";
  } else {
    if (emailId.value.length === 0) {
      emailWarning.innerText = "Please provide Email Id";
    } else if (
      !(
        emailId.value.match(validEmail) &&
        (emailId.value.includes(".com") || emailId.value.includes(".in"))
      )
    ) {
      emailWarning.innerText = "Please Enter a valid Email Id";
    } else {
      if (
        passwordInput.value.length < 8 ||
        !passwordInput.value.match(validPassword)
      ) {
        passwordRequirements.classList.add("show");
      } else {
        passwordRequirements.classList.remove("show");
        if (!(passwordInput.value === confirmPasswordInput.value)) {
          passwordWarning.innerText = "Passwords do not match";
        } else {
          signUpDetails = {
            userName: userName.value,
            userEmail: emailId.value.toLowerCase(),
            password: passwordInput.value,
          };
          let validUser = await newUserLog(signUpDetails);
          if (validUser) {
            loginPage.classList.remove("inactive");
            signUpPage.classList.add("inactive");
            loginSnackBar.classList.remove("inactive");
            setTimeout(() => {
              loginSnackBar.classList.add("inactive");
            }, 5000);
            document.getElementById("sign-up-form").reset();
            document.getElementById("login-form").reset();
            loginEmailWarning.innerText = null;
            loginPasswordWarning.innerText = null;
            passwordRequirements.classList.toggle("show");
          } else {
            emailWarning.textContent =
              "Email Id already exists. Login or try another Email Id";
          }
        }
      }
    }
  }
}

async function logInVerification() {
  loginEmailWarning.innerText = null;
  loginPasswordWarning.innerText = null;

  if (loginEmailId.value.length === 0) {
    loginEmailWarning.innerText = "Please Enter your Email Id";
  } else if (
    !(
      loginEmailId.value.match(validEmail) &&
      (loginEmailId.value.includes(".com") || emailId.value.includes(".in"))
    )
  ) {
    loginEmailWarning.innerText = "Please Enter a valid Email Id";
  } else if (loginPassword.value.length === 0) {
    loginPasswordWarning.innerText = "Please Enter your Password";
  } else {
    let loginUserDetails = {
      userEmail: loginEmailId.value.toLowerCase(),
      userPassword: loginPassword.value,
    };
    let validUser = await existingUserLog(loginUserDetails);
    switch (validUser) {
      case "valid":
        window.location = "../html/home.html";
        break;
      case "wrongPassword":
        loginPasswordWarning.innerText = "Incorrect Password. Kindly check it";
        break;
      case "notFound":
        userNotFoundSnackBar.classList.remove("inactive");
        setTimeout(() => {
          userNotFoundSnackBar.classList.add("inactive");
        }, 5000);
        break;
    }
  }
}
