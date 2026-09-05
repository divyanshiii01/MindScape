require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { MongoClient } = require("mongodb");
const multer = require("multer");
const { PDFParse } = require("pdf-parse");
const { askAI } = require("./ai/aiService");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"));
        }
    }
});

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("MONGODB_URI is missing from .env");
    process.exit(1);
}

const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 10000,
});

async function startServer() {
    try {
        await client.connect();

        // Test that the MongoDB connection actually works
        await client.db("mindscape").command({ ping: 1 });

        const db = client.db("mindscape");
        const sessionsCollection = db.collection("sessions");
        await sessionsCollection.createIndex(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

        console.log("MongoDB Connected Successfully!");
        console.log("MindScape database connection verified!");

        // Create a new study session
        app.post("/api/session", async (req, res) => {
            try {
                const sessionId = crypto.randomUUID();

                const session = {
                    sessionId,
                    extractedText: "",
                    world: null,
                    createdAt: new Date(),
                    expiresAt: new Date(Date.now() + 60 * 60 * 1000)
                };

                await sessionsCollection.insertOne(session);

                res.status(201).json({
                    success: true,
                    sessionId
                });

            } catch (error) {
                console.error("Session creation failed:", error);

                res.status(500).json({
                    success: false,
                    message: "Could not create study session"
                });
            }
        });

        // Get an existing study session
        app.get("/api/session/:sessionId", async (req, res) => {
            try {
                const { sessionId } = req.params;

                const session = await sessionsCollection.findOne({
                    sessionId
                });

                if (!session) {
                    return res.status(404).json({
                        success: false,
                        message: "Session not found"
                    });
                }

                res.json({
                    success: true,
                    session
                });

            } catch (error) {
                console.error("Session retrieval failed:", error);

                res.status(500).json({
                    success: false,
                    message: "Could not retrieve session"
                });
            }
        });

// Get AI analysis for a study session
app.get("/api/session/:sessionId/analysis", async (req, res) => {
    try {
        const { sessionId } = req.params;

        const session = await sessionsCollection.findOne(
            { sessionId },
            {
                projection: {
                    _id: 0,
                    sessionId: 1,
                    aiAnalysis: 1,
                    aiModel: 1,
                    analyzedAt: 1
                }
            }
        );

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        if (!session.aiAnalysis) {
            return res.status(404).json({
                success: false,
                message: "Notes have not been analyzed yet"
            });
        }

        res.json({
            success: true,
            analysis: session.aiAnalysis,
            aiModel: session.aiModel,
            analyzedAt: session.analyzedAt
        });

    } catch (error) {
        console.error("Analysis retrieval failed:", error);

        res.status(500).json({
            success: false,
            message: "Could not retrieve AI analysis"
        });
    }
});

        // Upload a PDF and extract its text into the study session
app.post("/api/session/:sessionId/pdf", upload.single("pdf"), async (req, res) => {
    try {
        const { sessionId } = req.params;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a PDF file"
            });
        }

        const session = await sessionsCollection.findOne({ sessionId });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        const parser = new PDFParse({ data: req.file.buffer });
        const pdfData = await parser.getText();
        await parser.destroy();
        const extractedText = pdfData.text.trim();

        if (!extractedText) {
            return res.status(400).json({
                success: false,
                message: "Could not extract text from this PDF"
            });
        }

        await sessionsCollection.updateOne(
            { sessionId },
            {
                $set: {
                    extractedText
                }
            }
        );

        res.json({
            success: true,
            message: "PDF processed successfully",
            charactersExtracted: extractedText.length
        });

    } catch (error) {
        console.error("PDF processing failed:", error);

        res.status(500).json({
            success: false,
            message: "Could not process PDF"
        });
    }
});

// Analyze the extracted notes using the local AI model
app.post("/api/session/:sessionId/analyze", async (req, res) => {
    console.log("ANALYZE ROUTE HIT");
    try {
        const { sessionId } = req.params;

        const session = await sessionsCollection.findOne({ sessionId });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found"
            });
        }

        if (!session.extractedText) {
            return res.status(400).json({
                success: false,
                message: "Please upload and process a PDF first"
            });
        }

      const prompt = `
You are MindScape, an engineering study assistant.

Analyze the provided study notes and return ONLY valid JSON.

The JSON must have exactly these five fields:

{
  "summary": "A concise 3-5 sentence summary",
  "keyConcepts": [
    "concept 1",
    "concept 2",
    "concept 3",
    "concept 4",
    "concept 5"
  ],
  "definitions": [
    {
      "term": "term",
      "definition": "definition"
    }
  ],
  "questions": [
    {
      "question": "question 1",
      "answer": "correct answer with a clear explanation"
    },
    {
      "question": "question 2",
      "answer": "correct answer with a clear explanation"
    },
    {
      "question": "question 3",
      "answer": "correct answer with a clear explanation"
    },
    {
      "question": "question 4",
      "answer": "correct answer with a clear explanation"
    },
    {
      "question": "question 5",
      "answer": "correct answer with a clear explanation"
    }
  ],
  "revisionPoints": [
    "revision point 1",
    "revision point 2",
    "revision point 3",
    "revision point 4",
    "revision point 5"
  ]
}

Rules:
- Use ONLY information supported by the study notes.
- Do not invent facts, formulas, examples, or answers that are not supported by the notes.
- Create questions that test actual understanding of the study material.
- Make the questions suitable for an engineering student.
- Each answer must directly answer its corresponding question.
- Each answer should also briefly explain the reasoning or principle involved.
- Do not use generic instructions such as "review the concepts" or "work through the problem."
- Do not use the same answer for different questions.
- Keep questions concise but meaningful.
- Keep answers clear and sufficiently detailed to understand why they are correct.
- Do not add markdown.
- Do not add explanations outside the JSON.
- Return exactly 5 challenge questions.
- Return valid JSON only.

STUDY NOTES:

${session.extractedText}
`;

        console.log(`Starting AI analysis for session ${sessionId}...`);
        console.log("Sending request to Ollama...");

        const aiResponse = await askAI(prompt);

let analysis;

try {
    analysis = JSON.parse(aiResponse);
} catch (parseError) {
    console.error("AI returned invalid JSON:", aiResponse);

    return res.status(500).json({
        success: false,
        message: "AI returned invalid structured data"
    });
}

        await sessionsCollection.updateOne(
            { sessionId },
            {
                $set: {
                    aiAnalysis: analysis,
                    aiModel: "Gemini",
                    analyzedAt: new Date()
                }
            }
        );

        console.log("AI analysis completed successfully.");

        res.json({
            success: true,
            message: "Notes analyzed successfully",
            analysis
        });

    } catch (error) {
        console.error("AI analysis failed:", error);

        res.status(500).json({
            success: false,
            message: "Could not analyze notes"
        });
    }
});
        // Basic server health check
        app.get("/", (req, res) => {
            res.send("MindScape Backend + MongoDB is Running!");
        });

       app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `MindScape server running on port ${PORT}`
    );
});

    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error);
    }
}

startServer();