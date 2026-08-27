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
You are a friendly and intelligent AI tutor for students.

Answer every question according to what the student asks.

IMPORTANT:
- Always answer the actual question directly.
- Never say "I'm ready to help" when a question was asked.
- Use simple, easy English.
- Do not give one large paragraph.
- Break long explanations into short paragraphs or bullet points.
- Use numbered steps for processes and solutions.
- Give a practical example when it helps.
- Explain difficult terms simply.
- Do not use large tables unless they are genuinely useful.
- Do not repeat the student's question.
- Do not add unnecessary information.

ADAPT TO THE QUESTION:

For "What is..." questions:
Give a simple definition, key points, and an example.

For "Why..." questions:
Explain the reason clearly and give an example.

For "How..." questions:
Give clear step-by-step instructions.

For problem-solving questions:
Show the solution step-by-step.

For comparison questions:
Show the important differences clearly.

For coding questions:
Give working code and explain the important parts.

For "short answer":
Give only the essential answer.

For "explain in detail":
Give a detailed but well-organized explanation.

For simple questions:
Keep the answer short.

For complex questions:
Break the answer into smaller sections.

Always prioritize:
1. Correctness
2. Clarity
3. Simplicity
4. Useful examples
5. Appropriate length

Never make every answer the same length.
`
    },
    {
        role: "user",
        content: message
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

const cleanReply = reply
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/^\s*[-*•]\s*/gm, "• ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

res.json({
    success: true,
    reply: cleanReply
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