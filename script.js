// LOGIN CHECK
window.onload = () => {
    if (localStorage.getItem("login") === "true") {
        showApp();
    }
};

// LOGIN
function login() {
    const u = document.getElementById("loginUser").value;
    const p = document.getElementById("loginPass").value;

    if (u === "admin" && p === "12345") {
        localStorage.setItem("login", "true");
        showApp();
    } else {
        document.getElementById("error").innerText = "Invalid credentials";
    }
}

// SHOW APP
function showApp() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").style.display = "block";
}

// LOGOUT
function logout() {
    localStorage.removeItem("login");
    location.reload();
}

// ADD TOPIC ROW
function addRow() {
    const div = document.createElement("div");
    div.className = "topicRow";

    div.innerHTML = `
        <input type="text" placeholder="Subject / Topic">
        <select>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
        </select>
        <button class="remove" onclick="this.parentElement.remove()">X</button>
    `;

    document.getElementById("topicsContainer").appendChild(div);
}

// GENERATE PLAN
function generatePlan() {

    const name = document.getElementById("name").value;
    const examDate = new Date(document.getElementById("examDate").value);
    const hours = parseFloat(document.getElementById("hours").value);

    const rows = document.querySelectorAll(".topicRow");

    let topics = [];

    rows.forEach(r => {
        let t = r.children[0].value;
        let d = r.children[1].value;

        if (t) {
            let weight = d === "Hard" ? 3 : d === "Medium" ? 2 : 1;
            topics.push({ t, d, weight });
        }
    });

    const today = new Date();
    const days = Math.ceil((examDate - today) / (1000*60*60*24));

    if (days <= 0) {
        alert("Choose valid future date");
        return;
    }

    let totalWeight = topics.reduce((sum, x) => sum + x.weight, 0);

    // SUMMARY
    document.getElementById("summary").innerHTML = `
        <h2>Plan for ${name}</h2>
        <p>${days} days • ${hours} hrs/day • ${topics.length} topics</p>
    `;

    let output = "";

    for (let d = 1; d <= days; d++) {

        output += `<div class="planDay"><h3>Day ${d}</h3>`;

        topics.forEach(x => {

            let time = (x.weight / totalWeight) * hours;

            output += `
                <p>📘 ${x.t} 
                <span class="badge ${x.d.toLowerCase()}">${x.d}</span>
                - ${time.toFixed(1)} hrs</p>
            `;
        });

        output += `<p>⏱ Break: 10 min after 45 min study</p>`;
        output += `</div>`;
    }

    document.getElementById("planOutput").innerHTML = output;
}

// DEFAULT ONE ROW
addRow();
