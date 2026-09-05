import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function MindScapeLogo() {
  return (
    <div className="brand">
      <div className="brand-mark" aria-hidden="true">
        <div className="brain-emoji" aria-hidden="true">
  🧠
</div>
      </div>

      <span className="brand-name">MindScape</span>
    </div>
  );
}

function Home({
  sessionId,
  selectedFile,
  message,
  loading,
  charactersExtracted,
  analysis,
  onCreateSession,
  onFileChange,
  onUpload,
  onEnterWorld,
}) {
  return (
    <main className="home-page">
      <header className="home-nav">
        <MindScapeLogo />

        <span className="home-nav-label">
          AI-POWERED LEARNING
        </span>
      </header>

      <section className="home-content">
        <div className="home-copy">
          <span className="home-eyebrow">
            PERSONAL LEARNING SPACE
          </span>

          <h1>
            Turn your notes
            <br />
            into a <span>learning world.</span>
          </h1>

          <p className="home-description">
            Upload your notes and transform dense material
            into a visual space designed for understanding, revision,
            and active recall.
          </p>

          {!sessionId ? (
            <button
              className="sunset-button"
              onClick={onCreateSession}
              disabled={loading}
            >
              {loading ? "Preparing your space..." : "Begin your journey"}
            </button>
          ) : !analysis ? (
            <div className="home-upload">
              <label className="home-file">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={onFileChange}
                />

                <div className="file-icon">↑</div>

                <div className="file-information">
                  <strong>
                    {selectedFile
                      ? selectedFile.name
                      : "Choose your notes"}
                  </strong>

                  <span>
                    {selectedFile
                      ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                      : "PDF only · Maximum file size: 10 MB"}
                  </span>
                </div>

                <span className="file-browse">
                  Browse
                </span>
              </label>

              <button
                className="sunset-button upload-button"
                onClick={onUpload}
                disabled={loading || !selectedFile}
              >
                {loading
                  ? "Building your learning world..."
                  : "Bring notes to life"}
              </button>
            </div>
          ) : (
            <div className="ready-area">
              <div className="ready-indicator">
                <span className="ready-dot" />
                Your learning world is ready.
              </div>

              <button
                className="sunset-button"
                onClick={onEnterWorld}
              >
                Enter MindScape
              </button>
            </div>
          )}

          <div className="home-status">
            <span className="status-line" />

            <div>
              <span className="status-label">
                {message}
              </span>

              {charactersExtracted && (
                <span className="characters-count">
                  {charactersExtracted.toLocaleString()} characters processed
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="home-visual">
          <div className="sun-glow" />
          <div className="sun-disc" />

          <div className="sunset-horizon sunset-one" />
          <div className="sunset-horizon sunset-two" />
          <div className="sunset-horizon sunset-three" />
        </div>
      </section>

      <footer className="home-footer">
        <span>MindScape</span>
        <span>Learn deeply. Remember longer.</span>
      </footer>
    </main>
  );
}

/* ---------------------------------------------------------
   WEATHER
--------------------------------------------------------- */

function Weather({ weather }) {
  return (
    <div className={`weather-layer weather-${weather}`}>
      <div className="sky-glow" />

      {weather === "sunny" && (
        <>
          <div className="world-sun" />
          <div className="cloud cloud-a" />
          <div className="cloud cloud-b" />
        </>
      )}

      {weather === "cloudy" && (
        <>
          <div className="cloud cloud-a" />
          <div className="cloud cloud-b" />
          <div className="cloud cloud-c" />
        </>
      )}

      {weather === "rainy" && (
        <>
          <div className="rain-cloud rain-cloud-a" />
          <div className="rain-cloud rain-cloud-b" />
          <div className="rain" />
        </>
      )}

      {weather === "spring" && (
        <>
          <div className="spring-glow" />
          <div className="cloud cloud-a" />
          <div className="cloud cloud-b" />

          <div className="petal petal-a">✦</div>
          <div className="petal petal-b">✦</div>
          <div className="petal petal-c">✦</div>
          <div className="petal petal-d">✦</div>
        </>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   PALACE
--------------------------------------------------------- */

function Palace({ onClick }) {
  return (
    <button
      className="estate-location palace-location"
      onClick={onClick}
    >
      <div className="location-label palace-label">
        <strong>KNOWLEDGE HOUSE</strong>
        <span>Click for your summary</span>
      </div>

      <div className="palace">
        <div className="palace-roof" />

        <div className="palace-main">
          <div className="palace-floor palace-upper">
            <div className="palace-window" />
            <div className="palace-window" />
            <div className="palace-window" />
            <div className="palace-window" />
            <div className="palace-window" />
          </div>

          <div className="palace-floor palace-lower">
            <div className="palace-column" />
            <div className="palace-column" />

            <div className="palace-door">
              <div className="door-glow" />
            </div>

            <div className="palace-column" />
            <div className="palace-column" />
          </div>

          <div className="palace-balcony">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="palace-wing left-wing">
          <div className="wing-roof" />
          <div className="wing-window" />
          <div className="wing-window" />
        </div>

        <div className="palace-wing right-wing">
          <div className="wing-roof" />
          <div className="wing-window" />
          <div className="wing-window" />
        </div>

        <div className="palace-steps">
          <span />
          <span />
          <span />
        </div>
      </div>
    </button>
  );
}

/* ---------------------------------------------------------
   FOUNTAIN
--------------------------------------------------------- */

function Fountain({ onClick }) {
  return (
    <button
      className="estate-location fountain-location"
      onClick={onClick}
    >
      <div className="location-label">
        <strong>KNOWLEDGE FOUNTAIN</strong>
        <span>Click for key concepts</span>
      </div>

      <div className="fountain">
        <div className="water-stream stream-one" />
        <div className="water-stream stream-two" />
        <div className="water-stream stream-three" />

        <div className="fountain-top">
          <div className="fountain-water" />
        </div>

        <div className="fountain-pillar" />

        <div className="fountain-middle">
          <div className="fountain-water" />
        </div>

        <div className="fountain-base">
          <div className="fountain-water" />
        </div>
      </div>
    </button>
  );
}

/* ---------------------------------------------------------
   GARAGE
--------------------------------------------------------- */

function Garage({ onClick }) {
  return (
    <button
      className="estate-location garage-location"
      onClick={onClick}
    >
      <div className="location-label garage-label">
        <strong>CHALLENGE GARAGE</strong>
        <span>Click for a 2-minute challenge</span>
      </div>

      <div className="garage">
        <div className="garage-roof" />

        <div className="garage-building">
          <div className="garage-window" />
          <div className="garage-door">
            <div className="garage-door-line" />
            <div className="garage-door-line" />
            <div className="garage-door-line" />
          </div>
        </div>

        <div className="car car-one">
          <div className="car-window" />
          <div className="car-wheel wheel-one" />
          <div className="car-wheel wheel-two" />
        </div>

        <div className="car car-two">
          <div className="car-window" />
          <div className="car-wheel wheel-one" />
          <div className="car-wheel wheel-two" />
        </div>
      </div>
    </button>
  );
}

/* ---------------------------------------------------------
   GARDEN
--------------------------------------------------------- */

function Garden({ onClick }) {
  return (
    <button
      className="estate-location garden-location"
      onClick={onClick}
    >
      <div className="location-label garden-label">
        <strong>REVISION GARDEN</strong>
        <span>Click to revisit what you learned</span>
      </div>

      <div className="garden">
        <div className="garden-path" />

        <div className="hedge hedge-left" />
        <div className="hedge hedge-right" />

        <div className="tree tree-left">
          <div className="tree-trunk" />
          <div className="tree-crown" />
        </div>

        <div className="tree tree-right">
          <div className="tree-trunk" />
          <div className="tree-crown" />
        </div>

        <div className="flower-bed flower-bed-one">
          <span>✿</span>
          <span>✿</span>
          <span>✿</span>
          <span>✿</span>
        </div>

        <div className="flower-bed flower-bed-two">
          <span>✿</span>
          <span>✿</span>
          <span>✿</span>
          <span>✿</span>
        </div>

        <div className="garden-bench" />

        <div className="bird bird-one">⌁</div>
        <div className="bird bird-two">⌁</div>
      </div>
    </button>
  );
}

/* ---------------------------------------------------------
   CONTENT PANEL
--------------------------------------------------------- */

function ContentPanel({
  panel,
  analysis,
  onClose,
  challenge,
  challengeTime,
  answerVisible,
  setAnswerVisible,
}) {
  if (!panel) return null;

  const titleMap = {
    summary: "Knowledge House",
    concepts: "Knowledge Fountain",
    challenge: "Challenge Garage",
    revision: "Revision Garden",
  };

  const subtitleMap = {
    summary: "Your study material, distilled.",
    concepts: "The ideas worth remembering.",
    challenge: "Think before you reveal the answer.",
    revision: "A quiet place to revisit your learning.",
  };

  return (
    <div className="panel-overlay">
      <section className={`content-panel panel-${panel}`}>
        <button
          className="panel-close"
          onClick={onClose}
          aria-label="Close panel"
        >
          ×
        </button>

        <div className="panel-topline">
          <span>MINDSCAPE</span>
          <span>{titleMap[panel]}</span>
        </div>

        <h2>{titleMap[panel]}</h2>
        <p className="panel-subtitle">
          {subtitleMap[panel]}
        </p>

        {panel === "summary" && (
          <div className="panel-scroll">
            <div className="summary-block">
              <span className="panel-section-label">
                SUMMARY
              </span>

              <p>
                {analysis?.summary ||
                  "Your notes have been transformed into a concise study summary."}
              </p>
            </div>

            {analysis?.revisionPoints?.length > 0 && (
              <div className="panel-list-block">
                <span className="panel-section-label">
                  REVISION POINTS
                </span>

                {analysis.revisionPoints.map((point, index) => (
                  <div className="revision-row" key={index}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{point}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {panel === "concepts" && (
          <div className="panel-scroll">
            <span className="panel-section-label">
              KEY CONCEPTS
            </span>

            <div className="concept-grid">
              {(analysis?.keyConcepts || []).map(
                (concept, index) => (
                  <div className="concept-card" key={index}>
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>{concept}</strong>
                  </div>
                )
              )}
            </div>

            {analysis?.definitions?.length > 0 && (
              <>
                <span className="panel-section-label definitions-label">
                  IMPORTANT DEFINITIONS
                </span>

                <div className="definitions">
                  {analysis.definitions.map((item, index) => (
                    <div className="definition" key={index}>
                      <strong>{item.term}</strong>
                      <p>{item.definition}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {panel === "challenge" && (
  <div className="challenge-content">

    <div className="challenge-timer">
      <span>THINKING TIME</span>
      <strong>
        {String(Math.floor(challengeTime / 60)).padStart(2, "0")}:
        {String(challengeTime % 60).padStart(2, "0")}
      </strong>
    </div>

    {!answerVisible ? (
      <>
        <div className="challenge-question">
          <span className="panel-section-label">
            YOUR CHALLENGE
          </span>

          <h3>{challenge?.question}</h3>
        </div>

        <p className="challenge-note">
          Think it through before checking the solution.
        </p>

        <button
          className="reveal-answer-button"
          onClick={() => setAnswerVisible(true)}
        >
          Reveal Answer
        </button>
      </>
    ) : (
      <div className="challenge-answer">
        <span className="panel-section-label">
          SOLUTION
        </span>

        <h3>{challenge?.question}</h3>

        <div className="answer-box">
          <p>{challenge?.answer}</p>
        </div>
      </div>
    )}

  </div>
)}

        {panel === "revision" && (
          <div className="panel-scroll">
            <span className="panel-section-label">
              QUESTIONS TO REVISIT
            </span>

            <div className="revision-questions">
              {(analysis?.questions || []).map(
                (question, index) => (
                  <div
                    className="revision-question"
                    key={index}
                  >
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p>{question.question}</p>
                  </div>
                )
              )}
            </div>

            <span className="panel-section-label revision-label">
              QUICK RECALL
            </span>

            <div className="recall-list">
              {(analysis?.keyConcepts || []).slice(0, 5).map(
                (concept, index) => (
                  <div key={index}>
                    <span>✦</span>
                    <p>Can you explain {concept} without looking?</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------------------------------------------------------
   WORLD
--------------------------------------------------------- */

function World({
  analysis,
  weather,
  setWeather,
  activePanel,
  setActivePanel,
  onBackHome,
}) {
  const [challenge, setChallenge] = useState(null);
  const [challengeTime, setChallengeTime] = useState(120);
  const [answerVisible, setAnswerVisible] = useState(false);

  const openPanel = (panel) => {
    setActivePanel(panel);

    if (panel === "summary") {
      setWeather("sunny");
    }

    if (panel === "concepts") {
      setWeather("rainy");
    }

    if (panel === "challenge") {
      setWeather("cloudy");
      setAnswerVisible(false);
      setChallengeTime(120);

      const questions = analysis?.questions || [];

if (questions.length > 0) {
  const selected =
    questions[
      Math.floor(Math.random() * questions.length)
    ];

  setChallenge(selected);
      } else {
        setChallenge({
          question:
            "Explain the most important idea from your notes in your own words.",
          answer:
            "Return to the Knowledge House and Knowledge Fountain to review the key ideas before trying again.",
        });
      }
    }

    if (panel === "revision") {
      setWeather("spring");
    }
  };

  useEffect(() => {
    if (activePanel !== "challenge" || answerVisible) {
      return;
    }

    if (challengeTime <= 0) {
      setAnswerVisible(true);
      return;
    }

    const timer = setInterval(() => {
      setChallengeTime((time) => Math.max(0, time - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [activePanel, challengeTime, answerVisible]);

  return (
    <main className="world-page">
      <Weather weather={weather} />

      <header className="world-header">
        <MindScapeLogo />

        <button
          className="back-home"
          onClick={onBackHome}
        >
          ← Back to Home
        </button>
      </header>

      <div className="world-title">
        <span>YOUR LEARNING WORLD</span>
        <h1>MindScape</h1>
      </div>

      <section className="estate">
        <div className="estate-ground" />

        <div className="estate-path main-path" />
        <div className="estate-path side-path-left" />
        <div className="estate-path side-path-right" />

        <Palace
          onClick={() => openPanel("summary")}
        />

        <Fountain
          onClick={() => openPanel("concepts")}
        />

        <Garage
          onClick={() => openPanel("challenge")}
        />

        <Garden
          onClick={() => openPanel("revision")}
        />

        <div className="estate-light light-one" />
        <div className="estate-light light-two" />
        <div className="estate-light light-three" />
      </section>

      <div className="world-footer">
        <span>
          {weather === "sunny" && "Clear skies over your knowledge."}
          {weather === "rainy" && "Let the ideas flow."}
          {weather === "cloudy" && "Take a moment. Think deeply."}
          {weather === "spring" && "Let your learning bloom."}
        </span>

        <span>
          Select a place to explore.
        </span>
      </div>

      <ContentPanel
        panel={activePanel}
        analysis={analysis}
        onClose={() => setActivePanel(null)}
        challenge={challenge}
        challengeTime={challengeTime}
        answerVisible={answerVisible}
        setAnswerVisible={setAnswerVisible}
      />
    </main>
  );
}

/* ---------------------------------------------------------
   MAIN APP
--------------------------------------------------------- */

function App() {
  const [view, setView] = useState("home");

  const [sessionId, setSessionId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [message, setMessage] = useState(
    "Upload your notes to begin."
  );

  const [loading, setLoading] = useState(false);
  const [charactersExtracted, setCharactersExtracted] =
    useState(null);

  const [analysis, setAnalysis] = useState(null);

  const [activePanel, setActivePanel] = useState(null);
  const [weather, setWeather] = useState("sunny");

  const normalizedAnalysis = useMemo(() => {
    if (!analysis) return null;

    if (typeof analysis === "string") {
      return {
        summary: analysis,
        keyConcepts: [],
        definitions: [],
        questions: [],
        revisionPoints: [],
      };
    }

    return analysis;
  }, [analysis]);

  async function createSession() {
    try {
      setLoading(true);
      setMessage("Preparing your private learning space...");
      setCharactersExtracted(null);

      const response = await fetch(
        `${API_URL}/api/session`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Could not create session"
        );
      }

      setSessionId(data.sessionId);
      setMessage("Choose the notes you want to explore.");
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
    setMessage("Your notes are ready to be processed.");
  }

  async function uploadPdf() {
    if (!sessionId) {
      setMessage("Prepare a learning session first.");
      return;
    }

    if (!selectedFile) {
      setMessage("Choose a PDF first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("Reading your notes...");
      setCharactersExtracted(null);
      setAnalysis(null);

      const formData = new FormData();
      formData.append("pdf", selectedFile);

      const response = await fetch(
        `${API_URL}/api/session/${sessionId}/pdf`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Could not process PDF"
        );
      }

      setCharactersExtracted(data.charactersExtracted);

      setMessage("Notes understood. Preparing your world...");

      /*
       * The backend endpoint created during your previous work.
       * This is the ONLY place the AI analysis is requested.
       */
      const analyzeResponse = await fetch(
        `${API_URL}/api/session/${sessionId}/analyze`,
        {
          method: "POST",
        }
      );

      const analyzeData = await analyzeResponse.json();

      if (
        !analyzeResponse.ok ||
        !analyzeData.success
      ) {
        throw new Error(
          analyzeData.message ||
            "Could not analyze your notes"
        );
      }

      setAnalysis(analyzeData.analysis);

      setMessage("Your learning world is ready.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  function enterWorld() {
    if (!normalizedAnalysis) {
      setMessage("Your learning world is not ready yet.");
      return;
    }

    setActivePanel(null);
    setWeather("sunny");
    setView("world");
  }

  function goHome() {
    /*
     * IMPORTANT:
     * We intentionally DO NOT clear sessionId or analysis.
     * Going home is navigation only.
     */
    setActivePanel(null);
    setView("home");

    if (normalizedAnalysis) {
      setMessage("Your learning world is ready.");
    }
  }

  return view === "home" ? (
    <Home
      sessionId={sessionId}
      selectedFile={selectedFile}
      message={message}
      loading={loading}
      charactersExtracted={charactersExtracted}
      analysis={normalizedAnalysis}
      onCreateSession={createSession}
      onFileChange={handleFileChange}
      onUpload={uploadPdf}
      onEnterWorld={enterWorld}
    />
  ) : (
    <World
      analysis={normalizedAnalysis}
      weather={weather}
      setWeather={setWeather}
      activePanel={activePanel}
      setActivePanel={setActivePanel}
      onBackHome={goHome}
    />
  );
}

export default App;