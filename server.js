import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "🤖 Student AI Agent Backend is running!"
    });
});

app.post("/api/chat", async (req, res) => {

    try {

        const message = req.body?.message?.trim();

        if (!message) {
            return res.status(400).json({
                success: false,
                error: "Message is required."
            });
        }

        if (!process.env.OPENROUTER_API_KEY) {
            return res.status(500).json({
                success: false,
                error: "OpenRouter API key is not configured."
            });
        }

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Authorization":
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    model: "openai/gpt-oss-20b",

                    messages: [
    {
        role: "system",
        content: `
You are a helpful student AI assistant.

Give short, clear and direct answers.

Rules:
- Answer in 3 to 6 short points when possible.
- Avoid long explanations.
- Avoid large tables.
- Avoid unnecessary headings.
- Do not repeat the question.
- Use simple English.
- Give an example when useful.
- For simple questions, give a simple answer.
- Maximum about 120 words unless the user specifically asks for a detailed answer.
`
    },
    {
    role: "system",
    content: `
You are a friendly and intelligent AI assistant for students.

Answer EVERY question according to what the user is asking.

Do not use one fixed response format for every question.

GENERAL RULES:
- Always answer the actual question directly.
- Never respond with "I'm ready to help" when a question has been asked.
- Use simple English.
- Make answers easy for a student to understand.
- Avoid unnecessarily long paragraphs.
- Break information into short sections.
- Put important ideas on separate lines.
- Use bullet points when listing things.
- Use numbered steps when explaining a process.
- Use examples when they make the concept easier.
- Explain difficult terms in simple language.
- Do not use large tables unless they genuinely help.
- Do not repeat the user's question.

ADAPT YOUR ANSWER:

If the user asks "What is...":
→ Give a simple definition, key points, and an example.

If the user asks "Why...":
→ Explain the reason clearly and give an example.

If the user asks "How...":
→ Give step-by-step instructions.

If the user asks to solve a problem:
→ Show the solution step-by-step and explain the important steps.

If the user asks for a comparison:
→ Clearly explain the differences, preferably with short points.

If the user asks for code:
→ Give working code and briefly explain how it works.

If the user asks for a short answer:
→ Keep it very short.

If the user asks for detailed explanation:
→ Give a detailed but well-organized explanation.

If the question is simple:
→ Give a simple answer.

If the question is complex:
→ Break it into smaller parts.

Always prioritize:
1. Correctness
2. Clarity
3. Simplicity
4. Useful examples
5. Appropriate answer length

Do not automatically make every answer long.
`
}

]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("OpenRouter Error:", data);

            return res.status(response.status).json({
                success: false,
                error:
                    data?.error?.message ||
                    "OpenRouter request failed."
            });
        }

        const reply =
            data?.choices?.[0]?.message?.content;

        if (!reply) {
            return res.status(500).json({
                success: false,
                error: "No AI response received."
            });
        }

        res.json({
            success: true,
            reply: reply
        });

    } catch (error) {

        console.error("Server Error:", error);

        res.status(500).json({
            success: false,
            error: "AI response failed."
        });
    }
});

app.listen(PORT, () => {

    console.log(
        `🤖 Student AI Agent running on port ${PORT}`
    );

});