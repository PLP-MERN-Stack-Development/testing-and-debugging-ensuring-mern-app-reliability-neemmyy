import { useEffect, useState } from "react";
import { getBugs, createBug, updateBugStatus } from "./api/bugs";

function App() {
  const [bugs, setBugs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function loadBugs() {
    const data = await getBugs();
    setBugs(data);
  }

  useEffect(() => {
    loadBugs();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !description) return;

    await createBug({ title, description });
    setTitle("");
    setDescription("");
    loadBugs();
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Bug Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Bug title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <textarea
          placeholder="Bug description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Report Bug</button>
      </form>

      <hr />

      <ul>
        {bugs.map((bug) => (
          <li key={bug._id} style={{ marginBottom: "10px" }}>
            <strong>{bug.title}</strong> — {bug.description}{" "}
            <em>[{bug.status}]</em>
            <br />
            <button
              onClick={async () => {
                await updateBugStatus(
                  bug._id,
                  bug.status === "open" ? "closed" : "open"
                );
                loadBugs();
              }}
            >
              Toggle Status
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
