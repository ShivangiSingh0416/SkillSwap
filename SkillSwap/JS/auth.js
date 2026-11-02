
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const college = document.getElementById("college").value.trim();
        const course = document.getElementById("course").value;
        const teach = document.getElementById("teach").value.trim();
        const learn = document.getElementById("learn").value.trim();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const users = JSON.parse(
            localStorage.getItem("users") || "[]"
        );

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            alert("This email is already registered!");
            return;
        }

        const newUser = {
            name,
            email,
            password,
            college,
            course,
            teach,
            learn
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful!");

        window.location.href = "login.html";

    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail")
            .value.trim().toLowerCase();

        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(
            localStorage.getItem("users") || "[]"
        );

        const currentUser = users.find(user =>
            user.email === email && user.password === password
        );

        if (currentUser) {

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(currentUser)
            );

            alert("Login Successful!");

            window.location.href = "dashboard.html";

        } else {

            alert("Invalid Email or Password!");

        }

    });
}
