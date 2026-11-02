
const currentUser = JSON.parse(
    localStorage.getItem("loggedInUser")
);

if (!currentUser) {
    window.location.href = "login.html";
}

document.getElementById("studentName").textContent =
    currentUser.name;

function getRequests() {
    return JSON.parse(localStorage.getItem("requests") || "[]");
}

function showRequests() {
    const requests = getRequests();

    const sent = requests.filter(
        r => r.from === currentUser.email
    );

    const received = requests.filter(
        r => r.to === currentUser.email
    );

    const sentBox = document.getElementById("sentRequests");
    const receivedBox = document.getElementById("receivedRequests");

    sentBox.innerHTML = "";
    receivedBox.innerHTML = "";

    function createCard(request, isReceived) {
        const card = document.createElement("div");
        card.className = "request-card";

        const name = document.createElement("h3");
        name.textContent = isReceived
            ? request.fromName
            : request.toName;

        const offered = document.createElement("p");
        offered.textContent = "Skill Offered: " + request.skillOffered;

        const wanted = document.createElement("p");
        wanted.textContent = "Skill Wanted: " + request.skillWanted;

        const status = document.createElement("p");
        status.textContent = "Status: " + request.status;

        card.append(name, offered, wanted, status);

        if (isReceived && request.status === "Pending") {
            ["Accepted", "Rejected"].forEach(action => {
                const btn = document.createElement("button");
                btn.textContent = action;

                btn.addEventListener("click", () => {
                    updateRequest(request.id, action);
                });

                card.appendChild(btn);
            });
        }

        return card;
    }

    if (sent.length === 0) {
        sentBox.textContent = "No sent requests yet.";
    } else {
        sent.forEach(r => sentBox.appendChild(createCard(r, false)));
    }

    if (received.length === 0) {
        receivedBox.textContent = "No received requests yet.";
    } else {
        received.forEach(r => receivedBox.appendChild(createCard(r, true)));
    }
}

function updateRequest(id, status) {
    const requests = getRequests();

    const updated = requests.map(r => {
        if (r.id === id && r.to === currentUser.email) {
            return { ...r, status: status };
        }
        return r;
    });

    localStorage.setItem("requests", JSON.stringify(updated));
    showRequests();
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

showRequests();
