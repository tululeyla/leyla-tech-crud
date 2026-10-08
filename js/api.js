const BASE_URL = "https://jsonplaceholder.typicode.com/users";

// GET: Fetch initial list of clients/engineers
export async function getClients() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch clients (Status: ${response.status})`);
  }
  return await response.json();
}

// POST: Add a new client/engineer
export async function createClient(clientData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create client (Status: ${response.status})`);
  }

  return await response.json();
}