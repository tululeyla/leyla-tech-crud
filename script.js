// 1. Fixed selector from ".form" to "form"
const form = document.querySelector("form");
const input = document.querySelector("#engineerName");
const engineerList = document.getElementById("engineer-list");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const inputValue = input.value.trim();
  if (!inputValue) return; // Guard against empty inputs!

  try {
    const created = await fetchEngineers(inputValue);

    // 2. Used insertAdjacentHTML to prevent destroying existing event listeners
    const cardHTML = `
      <div id="card-${created.id}">
        <h2>${created.name}</h2>
        <button class="delete-btn" data-id="${created.id}">Delete</button>
      </div>
    `;
    engineerList.insertAdjacentHTML("beforeend", cardHTML);

    form.reset();

    // Re-bind listeners cleanly
    bindDeleteButtons();

  } catch (error) {
    console.error("POST Error:", error.message);
  }
});

async function fetchEngineers(nameValue) {
  const payload = { name: nameValue, company: { name: "LeylaTech" } };

  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create engineer");
  return await res.json();
}

function bindDeleteButtons() {
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    // Remove existing listener before adding a new one to prevent duplicates, OR use inline onclick
    btn.onclick = async () => {
      const id = btn.getAttribute("data-id");

      try {
        await deleteEngineer(id);
        
        // 3. Clean DOM deletion using getElementById
        const card = document.getElementById(`card-${id}`);
        if (card) card.remove();

      } catch (error) {
        console.error("DELETE Error:", error.message);
      }
    };
  });
}

async function deleteEngineer(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete engineer");
}