
let currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!currentUser) {
    window.location.href = "login.html";
}

function displayProfile() {
    document.getElementById("profileName").textContent = currentUser.name;
    document.getElementById("profileEmail").textContent = currentUser.email;
    document.getElementById("profileCollege").textContent = currentUser.college;
    document.getElementById("profileCourse").textContent = currentUser.course;
    document.getElementById("profileTeach").textContent = currentUser.teach || "Not added";
    document.getElementById("profileLearn").textContent = currentUser.learn || "Not added";
}

function enableEdit() {
    document.getElementById("editForm").style.display = "block";

    document.getElementById("editName").value = currentUser.name;
    document.getElementById("editCollege").value = currentUser.college;
    document.getElementById("editCourse").value = currentUser.course;
    document.getElementById("editTeach").value = currentUser.teach || "";
    document.getElementById("editLearn").value = currentUser.learn || "";
}

document.getElementById("editForm").addEventListener("submit", function(e) {
    e.preventDefault();

    currentUser.name = document.getElementById("editName").value;
    currentUser.college = document.getElementById("editCollege").value;
    currentUser.course = document.getElementById("editCourse").value;
    currentUser.teach = document.getElementById("editTeach").value;
    currentUser.learn = document.getElementById("editLearn").value;

    localStorage.setItem("loggedInUser", JSON.stringify(currentUser));

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    users = users.map(user =>
        user.email === currentUser.email ? currentUser : user
    );

    localStorage.setItem("users", JSON.stringify(users));

    displayProfile();
    document.getElementById("editForm").style.display = "none";

    alert("Profile updated successfully!");
});

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

displayProfile();
