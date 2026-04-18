let subjects = [];
let examDate = null;

// Login functionality
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous error message
    errorMessage.textContent = '';

    // Prevent empty input submission
    if (!username) {
        errorMessage.textContent = 'Please enter a username';
        return;
    }

    if (!password) {
        errorMessage.textContent = 'Please enter a password';
        return;
    }

    // Check specific credentials
    if (username === 'admin' && password === '1234') {
        // Login successful - hide login form and show study planner
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('mainContainer').style.display = 'block';
    } else {
        // Wrong credentials - show error message
        errorMessage.textContent = 'Invalid username or password';
    }
}

function addSubject() {
    const subjectInput = document.getElementById('subject');
    const examDateInput = document.getElementById('examDate');
    const subject = subjectInput.value.trim();
    const date = examDateInput.value;

    if (!subject) {
        alert('Please enter a subject name');
        return;
    }

    if (!date) {
        alert('Please select an exam date');
        return;
    }

    subjects.push({
        name: subject,
        date: date,
        id: Date.now()
    });

    examDate = date;
    subjectInput.value = '';
    updateSubjectsList();
}

function removeSubject(id) {
    subjects = subjects.filter(s => s.id !== id);
    updateSubjectsList();
}

function updateSubjectsList() {
    const container = document.getElementById('subjectsContainer');
    
    if (subjects.length === 0) {
        container.innerHTML = '<p style="color: #999; font-style: italic;">No subjects added yet</p>';
        return;
    }

    container.innerHTML = subjects.map(s => `
        <div class="subject-tag">
            ${s.name}
            <button onclick="removeSubject(${s.id})">×</button>
        </div>
    `).join('');
}

function generatePlan() {
    if (subjects.length === 0) {
        alert('Please add at least one subject first');
        return;
    }

    const now = new Date();
    const exam = new Date(examDate);
    const daysUntilExam = Math.ceil((exam - now) / (1000 * 60 * 60 * 24));

    if (daysUntilExam <= 0) {
        alert('Please select a future exam date');
        return;
    }

    let planHTML = '';
    const studyDaysPerSubject = Math.max(1, Math.floor(daysUntilExam / subjects.length));

    subjects.forEach((subject, index) => {
        const startDay = index * studyDaysPerSubject + 1;
        const endDay = (index === subjects.length - 1) ? daysUntilExam : (startDay + studyDaysPerSubject - 1);

        planHTML += `
            <div class="plan-item">
                <h3>${subject.name}</h3>
                <p><strong>Study Period:</strong> Day ${startDay} - Day ${endDay} (${endDay - startDay + 1} days)</p>
                <p><strong>Exam Date:</strong> ${new Date(subject.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</p>
                <p><strong>Suggested Schedule:</strong></p>
                <ul>
                    <li>Days ${startDay}-${Math.floor((endDay - startDay) / 2) + startDay}: Learn fundamentals and core concepts</li>
                    <li>Days ${Math.floor((endDay - startDay) / 2) + startDay + 1}-${endDay - 2}: Practice problems and applications</li>
                    <li>Days ${endDay - 1}-${endDay}: Review and mock exams</li>
                </ul>
            </div>
        `;
    });

    document.getElementById('planContent').innerHTML = planHTML;
    document.getElementById('studyPlan').classList.add('active');
    document.getElementById('emptyState').style.display = 'none';
}

// Initialize event listeners when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Login form event listeners
    document.getElementById('username').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') login();
    });

    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') login();
    });

    // Study planner event listeners
    document.getElementById('subject').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addSubject();
    });
});
