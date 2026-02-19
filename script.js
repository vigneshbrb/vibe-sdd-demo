let registrations = [];
let idCounter = 1;

function register() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let event = document.getElementById("event").value;

  let registration = {
    id: idCounter++,
    name: name,
    email: email,
    event: event,
    status: "registered"
  };

  registrations.push(registration);
  render();
}

function cancel(id) {
  let reg = registrations.find(r => r.id === id);
  reg.status = "cancelled";
  render();
}

function render() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  registrations.forEach(r => {
    list.innerHTML += `
      <li>
        ${r.name} - ${r.event} - ${r.status}
        <button onclick="cancel(${r.id})">Cancel</button>
      </li>
    `;
  });
}