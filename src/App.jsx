import { useEffect, useState } from "react";
import Quiz from "./Quiz";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const modeClass = darkMode ? "bg-dark text-light" : "bg-light text-dark";

  return (
    <div className={`min-vh-100 d-flex flex-column align-items-center justify-content-center ${modeClass}`}>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Loading Quiz...</p>
        </div>
      ) : (
        <div className="container p-4 rounded shadow-lg" style={{ maxWidth: "600px", background: darkMode ? "#333" : "#fff" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold">Tunisia Quiz</h2>
            <button className="btn btn-sm btn-secondary" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          <div className="mb-3 d-flex gap-2">
            <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>All</option>
              <option>Geography</option>
              <option>History</option>
              <option>Economy</option>
            </select>
            <select className="form-select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option>All</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <Quiz darkMode={darkMode} category={category} difficulty={difficulty} />
        </div>
      )}
    </div>
  );
}

export default App;
