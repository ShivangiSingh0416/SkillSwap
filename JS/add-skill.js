
const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!loggedInUser) {
    window.location.href = "login.html";
}

const skillForm = document.getElementById("skillForm");
const mySkillsList = document.getElementById("mySkillsList");

function displayMySkills() {
    const allSkills = JSON.parse(
        localStorage.getItem("studentSkills") || "[]"
    );

    const mySkills = allSkills.filter(
        skill => skill.email === loggedInUser.email
    );

    mySkillsList.innerHTML = "";

    mySkills.forEach(skill => {
        const card = document.createElement("div");
        card.className = "my-skill-card";

        const heading = document.createElement("h3");
        heading.textContent = skill.name;

        const description = document.createElement("p");
        description.textContent = skill.description;

        const category = document.createElement("p");
        category.textContent = "Category: " + skill.category;

        const level = document.createElement("p");
        level.textContent = "Level: " + skill.level;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            const updatedSkills = allSkills.filter(
                item => item.id !== skill.id
            );

            localStorage.setItem(
                "studentSkills",
                JSON.stringify(updatedSkills)
            );

            displayMySkills();
        });

        card.append(heading, description, category, level, deleteBtn);
        mySkillsList.appendChild(card);
    });
}

skillForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newSkill = {
        id: Date.now(),
        email: loggedInUser.email,
        name: document.getElementById("skillName").value.trim(),
        category: document.getElementById("skillCategory").value,
        description: document.getElementById("skillDescription").value.trim(),
        level: document.getElementById("skillLevel").value
    };

    if (!newSkill.name) {
        alert("Please enter skill name!");
        return;
    }

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

displayMySkills();
