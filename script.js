let topics = [];

// Add new row
function addRow() {
    const container = document.getElementById("topicsContainer");

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

    container.appendChild(div);
}

// Generate plan
function generatePlan() {

    const name = document.getElementById("name").value;
    const examDate = new Date(document.getElementById("examDate").value);
    const hours = document.getElementById("hours").value;

    const rows = document.querySelectorAll(".topicRow");

    if (rows.length === 0) {
        alert("Add at least one topic");
        return;
    }

    let topics = [];

    rows.forEach(row => {
        const topic = row.children[0].value;
        const difficulty = row.children[1].value;

        if (topic) {
            topics.push({ topic, difficulty });
        }
    });

    const today = new Date();
    const days = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
        alert("Invalid date");
        return;
    }

    let output = `
        <div class="planCard">
        <h2>Plan for ${name}</h2>
        <p>${days} days | ${hours} hrs/day</p>
        </div>
    `;

    // SPLIT LOGIC (MULTIPLE SUBJECTS PER DAY)
    for (let d = 1; d <= days; d++) {

        output += `<div class="planCard"><h3>Day ${d}</h3>`;

        topics.forEach(t => {

            let time = hours / topics.length;

            if (t.difficulty === "Hard") time += 0.5;
            if (t.difficulty === "Easy") time -= 0.2;

            output += `
                <p>📘 ${t.topic} 
                <span class="badge">${t.difficulty}</span>
                - ${time.toFixed(1)} hrs</p>
            `;
        });

        output += `
            <p>⏱ Break: 10 min after 45 min study</p>
        </div>`;
    }

    document.getElementById("output").innerHTML = output;
}

// Default one row
addRow();
