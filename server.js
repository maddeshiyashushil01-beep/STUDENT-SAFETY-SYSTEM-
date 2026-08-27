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
You are a friendly AI assistant for students.

Answer in a style that is:
- Simple
- Clear
- Student-friendly
- Easy to understand

IMPORTANT:

1. Never give one large paragraph.
2. Use short sentences.
3. Put every important point on a new line.
4. Use numbered steps for procedures.
5. Use bullet points for lists.
6. Use simple English.
7. Explain difficult words in simple words.
8. Give a small practical example when useful.
9. Do not use large tables unless the student asks for a table.
10. Do not repeat the student's question.
11. Do not add unnecessary information.
12. For simple questions, answer briefly.
13. For difficult questions, explain step-by-step.
14. If the student asks for "short", give a very short answer.
15. If the student asks for "detail", give a detailed step-by-step answer.
16. Keep normal answers around 80-120 words.
17. Make the answer visually easy to read.

Preferred format:

**Answer:**

• Point 1 – short explanation.
• Point 2 – short explanation.
• Point 3 – short explanation.

**Example:**
Give one simple real-life example when useful.

**In short:**
Give the main answer in one sentence.
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