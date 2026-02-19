// Simple campus event registration logic

let registrations = [];
const storageKey = 'campusRegistrations';

// load from localStorage if available
function loadRegistrations() {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
        try {
            registrations = JSON.parse(stored);
            // normalize emails and names, and remove duplicates
            registrations = registrations.map(r => ({
                ...r,
                email: r.email.trim().toLowerCase(),
                name: r.name.trim()
            }));
            // dedupe by email or name
            registrations = registrations.filter((r, idx, arr) =>
                arr.findIndex(x => x.email === r.email || x.name.toLowerCase() === r.name.toLowerCase()) === idx
            );
        } catch (e) {
            console.error('Failed to parse registrations:', e);
            registrations = [];
        }
    }
}

function saveRegistrations() {
    localStorage.setItem(storageKey, JSON.stringify(registrations));
}

function renderRegistrations() {
    const container = document.getElementById('registrationsList');
    container.innerHTML = '';

    if (registrations.length === 0) {
        container.innerHTML = '<p>No registrations yet.</p>';
        return;
    }

    registrations.forEach((reg) => {
        const div = document.createElement('div');
        div.className = 'registration-item';
        div.innerHTML = `
            <span>${reg.name} &ndash; ${reg.email} &ndash; ${reg.event}</span>
            <button class="cancel-btn" data-id="${reg.id}">Cancel</button>
        `;

        container.appendChild(div);
    });
}

function addRegistration(name, email, eventName) {
    name = name.trim();
    email = email.trim().toLowerCase();
    // prevent duplicate email registrations (global across events)
    const emailExists = registrations.some(r => r.email === email);
    if (emailExists) {
        alert('This email is already registered for an event.');
        return false;
    }
    // prevent duplicate names (global across events)
    const nameExists = registrations.some(r => r.name.toLowerCase() === name.toLowerCase());
    if (nameExists) {
        alert('A student with this name is already registered.');
        return false;
    }

    const reg = {
        id: Date.now(),
        name,
        email,
        event: eventName,
    };
    registrations.push(reg);
    saveRegistrations();
    renderRegistrations();
    return true;
}

function cancelRegistration(id) {
    registrations = registrations.filter((r) => r.id !== id);
    saveRegistrations();
    renderRegistrations();
}

// handle form submission
const form = document.getElementById('registrationForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value;
    const eventName = document.getElementById('event').value;

    if (!name || !email || !eventName) {
        return; // form validation should handle this too
    }

    const added = addRegistration(name, email, eventName);
    if (added) {
        form.reset();
    }
});

// delegate cancel button clicks
document.getElementById('registrationsList').addEventListener('click', (e) => {
    if (e.target.matches('.cancel-btn')) {
        const id = Number(e.target.getAttribute('data-id'));
        if (confirm('Are you sure you want to cancel this registration?')) {
            cancelRegistration(id);
        }
    }
});

// initialize UI
loadRegistrations();
renderRegistrations();
