
// Check student login

const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!currentUser) {
    alert("Please login first!");
    window.location.href = "login.html";
}

// Display student information

if (currentUser) {

    document.getElementById("studentName").textContent =
        currentUser.name;

    document.getElementById("welcomeName").textContent =
        currentUser.name;

    document.getElementById("collegeName").textContent =
        currentUser.college;

    document.getElementById("courseName").textContent =
        currentUser.course;

    document.getElementById("teachingSkills").textContent =
        currentUser.teach;

    document.getElementById("learningSkills").textContent =
        currentUser.learn;

    // Count skills

    const offered = currentUser.teach.split(",")
        .filter(skill => skill.trim()).length;

    const learning = currentUser.learn.split(",")
        .filter(skill => skill.trim()).length;

    document.getElementById("offeredCount").textContent =
        offered;

    document.getElementById("learningCount").textContent =
        learning;

    // Count exchange requests

    const requests = JSON.parse(
        localStorage.getItem("requests") || "[]"
    );

    const myRequests = requests.filter(
        request => request.from === currentUser.email
    );

    document.getElementById("requestCount").textContent =
        myRequests.length;
}

// Logout Function

function logout() {

    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully!");

    window.location.href = "login.html";
}
