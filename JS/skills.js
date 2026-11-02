
// Check Login

const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!currentUser) {
    alert("Please login first!");
    window.location.href = "login.html";
}

// Demo students for project presentation

const demoStudents = [
    {
        name: "Rahul Sharma",
        email: "rahul@demo.com",
        college: "ABC College",
        course: "BCA",
        teach: "HTML, CSS, JavaScript",
        learn: "Python, Java"
    },
    {
        name: "Priya Verma",
        email: "priya@demo.com",
        college: "XYZ College",
        course: "B.Tech",
        teach: "Graphic Design, Photoshop",
        learn: "Web Development"
    },
    {
        name: "Aman Gupta",
        email: "aman@demo.com",
        college: "ABC College",
        course: "BBA",
        teach: "Digital Marketing, SEO",
        learn: "JavaScript, HTML"
    }
];

// Get registered students

const registeredUsers = JSON.parse(
    localStorage.getItem("users") || "[]"
);

const allStudents = [...demoStudents, ...registeredUsers];

const studentGrid = document.getElementById("studentGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// Safe text for HTML display

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function(char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char];
    });
}

// Display Students

function displayStudents() {

    if (!currentUser) return;

    const searchValue = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;

    const filteredStudents = allStudents.filter(student => {

        if (student.email === currentUser.email) return false;

        const name = student.name.toLowerCase();
        const skills = student.teach.toLowerCase();

        const matchesSearch =
            name.includes(searchValue) ||
            skills.includes(searchValue);

        const skillList = student.teach
            .split(",")
            .map(skill => skill.trim());

        const matchesCategory = category === "all" ||
            skillList.some(skill => {

                const s = skill.toLowerCase();

                if (category === "programming")
                    return ["html", "css", "javascript", "java",
                            "python", "c", "c++"].includes(s);

                if (category === "design")
                    return ["graphic design", "photoshop",
                            "web design", "ui/ux"].includes(s);

                if (category === "marketing")
                    return ["digital marketing", "seo",
                            "social media marketing"].includes(s);

                return ![
                    "html", "css", "javascript", "java",
                    "python", "c", "c++", "graphic design",
                    "photoshop", "web design", "ui/ux",
                    "digital marketing", "seo",
                    "social media marketing"
                ].includes(s);
            });

        return matchesSearch && matchesCategory;
    });

    document.getElementById("resultCount").textContent =
        filteredStudents.length + " students found";

    studentGrid.innerHTML = "";

    if (filteredStudents.length === 0) {
        studentGrid.innerHTML =
            '<div class="no-results">No students found. Try another search.</div>';
        return;
    }

    filteredStudents.forEach(student => {

        const skills = student.teach.split(",")
            .map(skill =>
                `<span class="skill-tag">${escapeHTML(skill.trim())}</span>`
            ).join("");

        const card = document.createElement("div");
        card.className = "student-card";

        card.innerHTML = `
            <div class="student-avatar">
                ${escapeHTML(student.name.charAt(0).toUpperCase())}
            </div>

            <h3>${escapeHTML(student.name)}</h3>
            <p>${escapeHTML(student.college)} | ${escapeHTML(student.course)}</p>

            <strong>Can Teach:</strong>
            <div>${skills}</div>

            <button class="exchange-btn">
                Send Exchange Request
            </button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            sendRequest(student);
        });

        studentGrid.appendChild(card);
    });
}

// Send Exchange Request

function sendRequest(student) {

    const requests = JSON.parse(
        localStorage.getItem("requests") || "[]"
    );

    const alreadySent = requests.some(request =>
        request.from === currentUser.email &&
        request.to === student.email &&
        request.status === "Pending"
    );

    if (alreadySent) {
        alert("You have already sent a pending request!");
        return;
    }

    const newRequest = {
        id: Date.now(),
        from: currentUser.email,
        fromName: currentUser.name,
        to: student.email,
        toName: student.name,
        skillOffered: currentUser.teach,
        skillWanted: student.teach,
        status: "Pending",
        date: new Date().toLocaleDateString()
    };

    requests.push(newRequest);

    localStorage.setItem(
        "requests",
        JSON.stringify(requests)
    );

    alert("Exchange request sent successfully!");
}


// Search and Filter
if (searchInput && categoryFilter && studentGrid) {
    searchInput.addEventListener("input", displayStudents);
    categoryFilter.addEventListener("change", displayStudents);
    displayStudents();
}

// Header
const studentNameElement = document.getElementById("studentName");

if (studentNameElement) {
    studentNameElement.textContent =
        currentUser ? currentUser.name : "Student";
}


function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

// Initial Display

displayStudents();

// Add and Manage Student Skills

const skillForm = document.getElementById("skillForm");

if (skillForm) {

    const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    if (!loggedInUser) {
        alert("Please login first!");
        window.location.href = "login.html";
    } else {

        document.getElementById("studentName").textContent =
            loggedInUser.name;

        function getMySkills() {
            const allSkills = JSON.parse(
                localStorage.getItem("studentSkills") || "[]"
            );

            return allSkills.filter(
                skill => skill.email === loggedInUser.email
            );
        }

        function displayMySkills() {

            const mySkills = getMySkills();
            const skillsList = document.getElementById("mySkillsList");

            skillsList.innerHTML = "";

            if (mySkills.length === 0) {
                skillsList.innerHTML =
                    "<p>No skills added yet. Add your first skill!</p>";
                return;
            }

            mySkills.forEach(skill => {

                const card = document.createElement("div");
                card.className = "my-skill-card";

                const title = document.createElement("h3");
                title.textContent = skill.name;

                const category = document.createElement("p");
                category.textContent = "Category: " + skill.category;

                const description = document.createElement("p");
                description.textContent = skill.description;

                const level = document.createElement("p");
                level.textContent = "Level: " + skill.level;

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete Skill";
                deleteButton.className = "delete-skill-btn";

                deleteButton.addEventListener("click", function() {
                    deleteSkill(skill.id);
                });

                card.append(title, category, description, level, deleteButton);
                skillsList.appendChild(card);
            });
        }

        skillForm.addEventListener("submit", function(event) {

            event.preventDefault();

            const newSkill = {
                id: Date.now(),
                email: loggedInUser.email,
                name: document.getElementById("skillName").value.trim(),
                category: document.getElementById("skillCategory").value,
                description: document.getElementById("skillDescription").value.trim(),
                level: document.getElementById("skillLevel").value
            };

            const allSkills = JSON.parse(
                localStorage.getItem("studentSkills") || "[]"
            );

            allSkills.push(newSkill);

            localStorage.setItem(
                "studentSkills",
                JSON.stringify(allSkills)
            );

            alert("Skill added successfully!");

            skillForm.reset();
            displayMySkills();
        });

        function deleteSkill(id) {

            if (!confirm("Are you sure you want to delete this skill?")) {
                return;
            }

            let allSkills = JSON.parse(
                localStorage.getItem("studentSkills") || "[]"
            );

            allSkills = allSkills.filter(
                skill => !(skill.id === id && skill.email === loggedInUser.email)
            );

            localStorage.setItem(
                "studentSkills",
                JSON.stringify(allSkills)
            );

            displayMySkills();
        }

        displayMySkills();

    }
}

// Logout

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
