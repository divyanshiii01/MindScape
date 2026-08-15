import { useState } from "react";
import "./App.css";

function App() {
  const [sessionId, setSessionId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(
  "Create a study session to begin."
);
  const [loading, setLoading] = useState(false);
  const [charactersExtracted, setCharactersExtracted] = useState(null);

  async function createSession() {
    try {
      setLoading(true);
      setMessage("Creating your study session...");
      setCharactersExtracted(null);

      const response = await fetch("http://localhost:5000/api/session", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not create session");
      }

      setSessionId(data.sessionId);
      setMessage("Session ready. Upload your notes.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setSelectedFile(null);
      setMessage("Please choose a PDF file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setSelectedFile(null);
      setMessage("PDF must be smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    setMessage("Notes selected. Ready to process.");
  }

  async function uploadPdf() {
    if (!sessionId) {
      setMessage("Create a study session first.");
      return;
    }

    if (!selectedFile) {
      setMessage("Please select a PDF first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("Reading your notes...");
      setCharactersExtracted(null);

      const formData = new FormData();
      formData.append("pdf", selectedFile);

      const response = await fetch(
        `http://localhost:5000/api/session/${sessionId}/pdf`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not process PDF");
      }

      setCharactersExtracted(data.charactersExtracted);
      setMessage("Your notes are ready.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">

      {/* Floating scientific elements */}

      <header className="navbar">
        <div className="logo">
          <div className="logo-brain">◌</div>
          <span>MindScape</span>
        </div>

        <span className="nav-label">AI-powered learning</span>
      </header>

      <section className="hero">

        <div className="hero-content">

          <span className="eyebrow">PERSONAL LEARNING SPACE</span>

          <h1>
            Your engineering notes.
            <br />
            <span>Smarter learning.</span>
          </h1>

          <p>
            Upload your engineering notes PDF and turn dense material
            into something easier to understand, remember, and revise.
          </p>

          <div className="hero-actions">
  <span className="action-note">
    PDF · up to 10 MB
  </span>
</div>

        </div>

        <div className="science-visual">

  <div className="orbit orbit-one" />
  <div className="orbit orbit-two" />

  {/* Floating engineering instruments */}
  <div className="instrument caliper">⚙</div>
  <div className="instrument compass">⌖</div>
  <div className="instrument microscope">🔬</div>
  <div className="instrument gear">⚙</div>
  <div className="instrument ruler">△</div>

  <div className="test-tube">

    <div className="liquid">
      <span className="bubble b1" />
      <span className="bubble b2" />
      <span className="bubble b3" />
      <span className="bubble b4" />
    </div>

  </div>

  <div className="tube-shadow" />

</div>

      </section>

      <section className="workspace">

        <div className="workspace-header">
  <div>
    <span className="eyebrow">STUDY MATERIAL</span>
  </div>

  {sessionId && (
    <span className="session-status">
      Session ready
    </span>
  )}
</div>

        {!sessionId ? (
          <div className="empty-state">
            <div className="empty-icon">01</div>

            <div>
              <h3>Create a study session first</h3>
              <p>
                Your session gives your study material a private workspace.
              </p>
            </div>

            <button
              className="secondary-button"
              onClick={createSession}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create session"}
            </button>
          </div>
        ) : (
          <div className="upload-area">

            <label className="upload-box">

              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />

              <div className="upload-icon">
                ↑
              </div>

              <div>
                <strong>
                  {selectedFile
                    ? selectedFile.name
                    : "Choose your engineering notes"}
                </strong>

                <span>
                  {selectedFile
                    ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                    : "PDF files up to 10 MB"}
                </span>
              </div>

              <span className="browse">
                Browse
              </span>

            </label>

            <button
              className="process-button"
              onClick={uploadPdf}
              disabled={loading || !selectedFile}
            >
              {loading
                ? "Processing..."
                : "Process notes"}
            </button>

          </div>
        )}

        <div className="status">

          <div className="status-dot" />

          <div>
            <span>Status</span>
            <p>{message}</p>
          </div>

          {charactersExtracted && (
            <div className="result">
              <strong>
                {charactersExtracted.toLocaleString()}
              </strong>
              <span>characters extracted</span>
            </div>
          )}

        </div>

      </section>

      <footer>
        <span>MindScape</span>
        <span>Learn deeply. Remember longer.</span>
      </footer>

    </main>
  );
}

export default App;