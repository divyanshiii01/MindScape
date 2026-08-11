require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

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

        // Basic server health check
        app.get("/", (req, res) => {
            res.send("MindScape Backend + MongoDB is Running!");
        });

        app.listen(PORT, () => {
            console.log(
                `MindScape server running on http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error);
    }
}

startServer();