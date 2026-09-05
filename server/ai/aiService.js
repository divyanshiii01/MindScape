const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash";

async function askAI(prompt) {
    try {
        if (!GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not configured.");
        }

        console.log("Sending request to Gemini...");

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt,
                                },
                            ],
                        },
                    ],
                    generationConfig: {
                        temperature: 0.2,
                        responseMimeType: "application/json",
                    },
                }),
                signal: AbortSignal.timeout(5 * 60 * 1000),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                `Gemini request failed with status ${response.status}: ${JSON.stringify(data)}`
            );
        }

        const result =
            data.candidates?.[0]?.content?.parts
                ?.map((part) => part.text || "")
                .join("") || "";

        if (!result) {
            throw new Error("Gemini returned an empty response.");
        }

        console.log("Gemini response received.");

        return result;
    } catch (error) {
        console.error("Cloud AI request failed:", error);
        throw error;
    }
}

module.exports = {
    askAI,
};