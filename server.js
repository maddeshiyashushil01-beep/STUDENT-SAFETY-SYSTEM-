import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY is missing");
}

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Test backend
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🤖 Student AI Agent Backend is running!"
    });
});

// AI chat
app.post("/api/chat", async (req, res) => {

    try {

        const message = req.body?.message?.trim();

        if (!message) {
            return res.status(400).json({
                success: false,
                error: "Message is required."
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                success: false,
                error: "Gemini API key is not configured."
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message
        });

        res.json({
            success: true,
            reply: response.text
        });

    } catch (error) {

        console.error("Gemini Error:", error);

        res.status(500).json({
            success: false,
            error: "AI response failed."
        });
    }
});

app.listen(PORT, () => {
    console.log(`🤖 Student AI Agent running on port ${PORT}`);
});