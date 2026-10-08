import { getClients, createClient } from "./api.js";
import { renderCard, renderClientList, showStatusMessage } from "./ui.js";

const form = document.querySelector("form");
const input = document.querySelector("#engineerName");
const submitBtn = form.querySelector("button[type='submit']");

// 1. On Initial Page Load: Fetch & Display Clients (GET)
document.addEventListener("DOMContentLoaded", async () => {
  showStatusMessage("Loading clients from LeylaTech server...");
  try {
    const clients = await getClients();
    renderClientList(clients);
  } catch (error) {
    console.error("Initial load error:", error.message);
    showStatusMessage("Failed to load clients. Please refresh.", true);
  }
});

// 2. On Form Submit: Create New Client (POST)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nameValue = input.value.trim();
  if (!nameValue) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Saving...";

  try {
    const newClientPayload = {
      name: nameValue,
      company: { name: "LeylaTech Partner" },
      email: "client@leylatech.com"
    };

    const createdClient = await createClient(newClientPayload);
    renderCard(createdClient);
    form.reset();
  } catch (error) {
    console.error("Creation error:", error.message);
    alert("Could not create client. Please try again.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});