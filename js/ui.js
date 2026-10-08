const clientList = document.getElementById("engineer-list");

// Render a single card HTML
export function renderCard(client) {
  const companyName = client.company?.name || "LeylaTech";
  const role = client.email || "Frontend Client";

  const cardHTML = `
    <div class="card" id="card-${client.id}">
      <h2>${client.name}</h2>
      <p class="company">Company: ${companyName}</p>
      <p class="role">${role}</p>
      <button class="delete-btn" data-id="${client.id}">Delete</button>
    </div>
  `;
  clientList.insertAdjacentHTML("beforeend", cardHTML);
}

// Render a list of cards
export function renderClientList(clients) {
  clientList.innerHTML = ""; // Clear existing content / loader
  if (clients.length === 0) {
    clientList.innerHTML = `<p class="empty-msg">No active clients found.</p>`;
    return;
  }
  clients.forEach((client) => renderCard(client));
}

// Render status message (Loading / Error)
export function showStatusMessage(message, isError = false) {
  clientList.innerHTML = `
    <div class="${isError ? 'error-msg' : 'loading-msg'}">
      <p>${message}</p>
    </div>
  `;
}