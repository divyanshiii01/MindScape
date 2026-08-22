const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL_NAME = "qwen3:4b-instruct";

async function askAI(prompt) {
    try {
        console.log("Sending request to Ollama...");

        const response = await fetch(OLLAMA_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: MODEL_NAME,
                prompt,
                stream: false,
                format: "json"
            }),
            signal: AbortSignal.timeout(5 * 60 * 1000)
        });

        if (!response.ok) {
            throw new Error(
                `Ollama request failed with status ${response.status}`
            );
        }

        const data = await response.json();

        console.log("Ollama response received.");

        return data.response;

    } catch (error) {
        console.error("Local AI request failed:", error);
        throw error;
    }
}

module.exports = {
    askAI,
};