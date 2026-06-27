// ==========================
// DOM ELEMENTS
// ==========================

const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

// ==========================
// PASSWORD TOGGLE
// ==========================

const passwordGroup = password.parentElement;

const eyeIcon = document.createElement("i");
eyeIcon.className = "fas fa-eye";
eyeIcon.style.position = "absolute";
eyeIcon.style.right = "18px";
eyeIcon.style.top = "18px";
eyeIcon.style.cursor = "pointer";
eyeIcon.style.color = "#a855f7";

passwordGroup.appendChild(eyeIcon);

eyeIcon.addEventListener("click", () => {

    if(password.type === "password"){

        password.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");

    } else {

        password.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");

    }

});

// ==========================
// EMAIL VALIDATION
// ==========================

function validateEmail(userEmail){

    const pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(userEmail);

}

// ==========================
// LOGIN SUBMIT
// ==========================

loginForm.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    if(userEmail === ""){

        showToast(
            "Enter your email address",
            "error"
        );

        return;
    }

    if(!validateEmail(userEmail)){

        showToast(
            "Invalid email address",
            "error"
        );

        return;
    }

    if(userPassword.length < 6){

        showToast(
            "Password must contain at least 6 characters",
            "error"
        );

        return;
    }

    try{

        const response = await fetch(
            "http://localhost:8080/login",
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email: userEmail,
                    password: userPassword
                })
            }
        );

        const result = await response.text();

        if(result === "Login Successful"){

            localStorage.setItem(
                "loggedInUser",
                userEmail
            );

            loginSuccess();

        }else{

            showToast(
                result,
                "error"
            );

        }

    }catch(error){

        console.error(error);

        showToast(
            "Unable to connect to server",
            "error"
        );

    }

});

// ==========================
// LOGIN SUCCESS
// ==========================

function loginSuccess(){

    const loginButton =
    document.querySelector(".login-btn");

    loginButton.disabled = true;

    loginButton.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Signing In';

    setTimeout(()=>{

        loginButton.innerHTML =
        '<i class="fas fa-check"></i> Success';

        showToast(
            "Welcome to ShareUrStory 🚀",
            "success"
        );

        setTimeout(()=>{

            window.location.href =
            "socialhome.html";

        },1500);

    },2000);

}

// ==========================
// TOAST
// ==========================

function showToast(message,type){

    const toast =
    document.createElement("div");

    toast.classList.add("toast");

    toast.textContent =
    message;

    if(type === "success"){

        toast.style.background =
        "#22c55e";

    }else{

        toast.style.background =
        "#ef4444";

    }

    document.body.appendChild(
        toast
    );

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },300);

    },3000);

}

// ==========================
// INPUT ANIMATION
// ==========================

const inputs =
document.querySelectorAll("input");

inputs.forEach(input=>{

    input.addEventListener("focus",()=>{

        input.style.boxShadow =
        "0 0 20px rgba(168,85,247,.4)";

    });

    input.addEventListener("blur",()=>{

        input.style.boxShadow =
        "none";

    });

});

// ==========================
// ENTER KEY SUPPORT
// ==========================

password.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){

        loginForm.dispatchEvent(
            new Event("submit")
        );

    }

});

// ==========================
// PAGE LOAD ANIMATION
// ==========================

window.addEventListener("load",()=>{

    const loginCard =
    document.querySelector(".login-card");

    loginCard.style.opacity = "0";
    loginCard.style.transform =
    "translateY(40px)";

    setTimeout(()=>{

        loginCard.style.transition =
        "all .8s ease";

        loginCard.style.opacity =
        "1";

        loginCard.style.transform =
        "translateY(0)";

    },200);

});