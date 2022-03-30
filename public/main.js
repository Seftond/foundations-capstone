
document.addEventListener("DOMContentLoaded", () => {

    var thisUserId;
    var thisUsername;
    var userWins;
    var userLosses;
    var userPushes;

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
    function createAccount(e){
        e.preventDefault();
        if(createPassword.value === confirmPassword.value){
            let body = {
                username: createUsername.value,
                password: createPassword.value 
            }
            
            axios.post("http://localhost:4004/create", body)
            .then(res => {
                let {user_id, username, wins, losses, pushes} = res.data;
                thisUserId = user_id; 
                thisUsername = username;
                userWins = wins;
                userLosses = losses;
                userPushes = pushes;
                createUsername.value='';
                createPassword.value='';
                confirmPassword.value='';
                window.location.href="index.html";
            })
            .catch(err => alert("The username provided is already in use!"))
        } else {
            alert("The password and confirm password provided do not match. Please try again.")
        }
    }

    function login(e){
        e.preventDefault();
        let body ={
            username: username.value,
            password: password.value 
        } 
        axios.post("http://localhost:4004/login", body)
        .then(res => {
            let {user_id, username, wins, losses, pushes} = res.data;
            thisUserId = user_id; 
            thisUsername = username;
            userWins = wins;
            userLosses = losses;
            userPushes = pushes;
            username.value='';
            password.value='';
            window.location.href="index.html";
        })
        .catch(err => console.log(err));

    };

    //Event listeners
    try{
        newAccountLink.addEventListener("click", e => {
            e.preventDefault();
            loginForm.classList.add("hiddenForm");
            createAccountForm.classList.remove("hiddenForm");
        });
    } catch(error){
        console.log(`${error}: newAccountLink hidden`)
    }

    try{
        signInLink.addEventListener("click", e => {
            e.preventDefault();
            loginForm.classList.remove("hiddenForm")
            createAccountForm.classList.add("hiddenForm");
        });
    } catch(error){
        console.log(`${error}: signInLink hidden`)
    }

    try{
        createAccountSubmit.addEventListener("click", createAccount);
    } catch(error){
        console.log(`${error}: Create Account elements hidden`);
    }

    try{
        loginSubmit.addEventListener("click", login);
    } catch(error){
        console.log(`${error}: Login elements hidden`)
    }

});