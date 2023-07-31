// Declare all Identifiers
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let loginSubmit = document.getElementById("loginSubmit");
let signupName = document.getElementById("signupName");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");
let register = document.getElementById("registerBtn");
let msg = document.getElementById("msg");
let msgContainer = document.getElementById("msgContainer");
let signUpBtn = document.getElementById("signUpBtn");
let signinBtn = document.getElementById("signinBtn");
let signinBox = document.getElementById("signinBox");
let signupBox = document.getElementById("signupBox");
let showpasswordIcon = document.querySelector(".show-password");
let showpasswordIconsignin = document.querySelector(".show-password-signin");
let statusS = document.getElementById("statusS");
let logout = document.querySelector(".logout button")




// Global Operations
let temp = false;
let signupArray = [];
if (localStorage.getItem("users") === null) {
  signupArray = [];
} else {
  signupArray = JSON.parse(localStorage.getItem("users"));
}

// welcome message
function welcomeMsg(name) {
  return `Welcome ${name}`;
}

// check inputs are empty or not
function isEmpty() {
  if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
    return false;
  } else {
    return true;
  }
}

// check if email already exists
function isEmailExist() {
  return signupArray.some((elem) => elem.email.toLowerCase() === signupEmail.value.toLowerCase());
}

function validatePassword(password) {
  if (password.length < 8) {
    return "The password must be at least 8 characters long.";
  }

  if (!/[a-z]/.test(password)) {
    return "The password must contain at least one lowercase letter.";
  }

  if (!/[A-Z]/.test(password)) {
    return "The password must contain at least one uppercase letter.";
  }

  if (!/\d/.test(password)) {
    return "The password must contain at least one digit.";
  }

  if (!/[@$!%*?&]/.test(password)) {
    return "The password must contain at least one special character from the set @$!%*?&.";
  }

  return true;
}

(function () {
  signupPassword.addEventListener("keydown", function () {
    const passwordValidation = validatePassword(signupPassword.value);
    if (passwordValidation != true) {
      msgContainer.style.display = "block";

      msgContainer.innerHTML = `<ul><li>${passwordValidation}</li></ul>`;
      document.querySelector("#msgContainer ul li").style.color = "red";
      msgContainer.style.fontSize = "10px";
      msgContainer.style.backgroundColor = "white";
      temp = false;
      return false;
    } else {
      msgContainer.innerHTML = "The password is strong";
      msgContainer.style.color = "green";
      msgContainer.style.fontSize = "10px";
      msgContainer.style.backgroundColor = "white";
      msgContainer.style.padding = "2px";
      temp = true;
      return true;
    }
  });

  signupEmail.addEventListener("keydown", function () {
    if (isEmailExist() && validate()) {
      statusS.textContent = `The Email ${signupEmail.value} is already exist`;
      statusS.style.color = "red";
      statusS.style.fontSize = "10px";
      statusS.style.backgroundColor = "white";
      validate();
    } else {
      statusS.textContent = "The Email is available";
      statusS.style.color = "green";
      statusS.style.fontSize = "10px";
      statusS.style.backgroundColor = "white";
      validate();
    }
  });

  signupName.addEventListener("input", function () {
    let nameS = document.createElement("p");
    if (validate()) {
      nameS.textContent = `Please enter valid name. 3 to 7 characters`;
      nameS.style.color = "red";
      nameS.style.fontSize = "10px";
      nameS.style.backgroundColor = "white";
    } else {
      nameS.textContent = "";
      validate();
    }

    // Remove any existing error messages
    let existingNameS = statusS.querySelector(".name-error");
    if (existingNameS) {
      existingNameS.remove();
    }

    // Append the new error message
    nameS.classList.add("name-error");
    statusS.appendChild(nameS);
  });

;
})();

// Validate inputs
function validate() {
  let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let nameReg = /^.{3,7}$/;
  if (!emailReg.test(signupEmail.value.toLowerCase())) {
   statusS.textContent = "Incorrect Email Address";
    statusS.style.color = "red";
    return false;
  } else if (!nameReg.test(signupName.value)) {
    statusS.textContent = "Please enter your name. 3 to 7 characters";
    statusS.style.color = "red";
    return true;
  } else {
    statusS.textContent = "";
    return true;
  }
}

// Clean inputs
function clean() {
  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";
}

// Change screens
function changeScreen() {
  if (signinBox.style.display === "none") {
    signinBox.style.display = "block";
    signupBox.style.display = "none";
    clean()
    
  } else {
    signinBox.style.display = "none";
    signupBox.style.display = "block";
    clean()
  }
}

// Sign Up
function signUp() {
  // to store all value as object
  if (validate() && temp) {
    var signUp = {
      name: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value,
    };
    if (isEmailExist()) {
      statusS.textContent = `The Email ${signupEmail.value} is already exist`;
      statusS.style.color = "red";
    } else {
      signupArray.push(signUp);
      localStorage.setItem("users", JSON.stringify(signupArray));
      statusS.textContent = `Saved New User: ${signupEmail.value}`;
      statusS.style.color = "green";
      statusS.style.backgroundColor = "white";
      statusS.style.fontSize = "10px";
      clean();
      changeScreen();
      alert("User Added")
    }
  }
}

// Sign In
function signIn() {
    let email = loginEmail.value;
    let password = loginPassword.value;
    let found = false;
  
    for (let i = 0; i < signupArray.length; i++) {
      if (signupArray[i].email === email && signupArray[i].password === password) {
        found = true;
        let name = signupArray[i].name;
        localStorage.setItem("activeUser", name);
        location.replace("/home.html"); // redirect to home page
        msg.innerHTML = welcomeMsg(name);
        msg.style.color = "green";
        msgContainer.style.backgroundColor = "white";
        msgContainer.style.fontSize = "10px";
        break;
      }
    }
  
    if (!found) {
      msg.innerHTML = "Incorrect email or password";
      msg.style.color = "red";
      msgContainer.style.backgroundColor = "white";
      msgContainer.style.fontSize = "10px";
    }
  
    loginEmail.value = "";
    loginPassword.value = "";
  }


// Show Password
function showPassword() {
    if (signupPassword.type === "password") {
        signupPassword.type = "text";
    } else {
        signupPassword.type = "password";
    }
    if (loginPassword.type === "password") {
        loginPassword.type = "text";
    } else {
        loginPassword.type = "password";
    }
}

// Add Event Listeners
signinBtn.addEventListener("click", function () {
  changeScreen();
});

signUpBtn.addEventListener("click", function () {
  changeScreen();
});

register.addEventListener("click", function () {
  signUp();
});

loginSubmit.addEventListener("click", function () {
  signIn();
});

showpasswordIcon.addEventListener("click",function(){
    showPassword()
   
})

showpasswordIconsignin.addEventListener("click",function(){
    showPassword()
   
})
// ------------------
// logout
function logOut(){
    localStorage.removeItem('activeUser')
    alert("Logged out")
    location.replace("http://127.0.0.1:5500"); // redirect to home page


}


function welcomMsg(){
    var username = localStorage.getItem('activeUser')
    if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}

}

