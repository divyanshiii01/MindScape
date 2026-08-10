require("dotenv").config();

const express = require("express");
const cors = require("cors");
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

        // Test that the connection actually works
        await client.db("mindscape").command({ ping: 1 });

        console.log("MongoDB Connected Successfully!");
        console.log("MindScape database connection verified!");

        app.get("/", (req, res) => {
            res.send("MindScape Backend + MongoDB is Running!");
        });

        app.listen(PORT, () => {
            console.log(`MindScape server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error);
    }
}

startServer();