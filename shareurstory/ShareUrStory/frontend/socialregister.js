const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = {
        name: name,
        email: email,
        password: password
    };

    try {

        const response = await fetch(
            "http://localhost:8080/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );
const result = await response.text();

alert(result);

registerForm.reset();

window.location.href = "socialindex.html";

    } catch (error) {

        console.error(error);

        alert("Registration Failed!");

    }

});