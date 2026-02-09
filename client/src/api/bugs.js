const API_URL = "http://localhost:5000/api/bugs";

export async function getBugs() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function createBug(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateBugStatus(id, status) {
  const res = await fetch(`${API_URL}/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
}
