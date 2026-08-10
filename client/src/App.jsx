import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState(
    "Connecting to MindScape backend..."
  );

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
      })
      .catch(() => {
        setMessage("Could not connect to MindScape backend.");
      });
  }, []);

  return (
    <div>
      <h1>MindScape</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;