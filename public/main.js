document.addEventListener("DOMContentLoaded", () => {

    // Element selectors
    const loginForm = document.querySelector(".login");
    const createAccountForm = document.querySelector(".createAccount");
    const newAccountLink = document.querySelector("#newAccountLink");
    const signInLink = document.querySelector("#signInLink");
    const createAccountSubmit = document.getElementById("createAccountSubmit");
    const loginSubmit = document.getElementById("loginSubmit");
    const createUsername = document.getElementById("createUsername");
    const createPassword = document.getElementById("createPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const username = document.getElementById("username");
    const password = document.getElementById("password");


    //functions
    // function createAccount()


    //Event listeners
    newAccountLink.addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("hiddenForm");
        createAccountForm.classList.remove("hiddenForm");
    });

    signInLink.addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("hiddenForm")
        createAccountForm.classList.add("hiddenForm");
    });

    // createAccountSubmit.addEventListener("click", createAccount);
    // loginSubmit.addEventListener("click", verifyAccount);

});