import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Groq setup
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// test route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// 🤖 AI CHAT ROUTE
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    console.log("User:", message);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // 
      messages: [
        {
          role: "system",
          content:
            "You are a helpful medical assistant. Provide safe advice and always include a disclaimer.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    console.log("Bot:", reply);

    res.json({ reply });

  } catch (error) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      reply: "AI server error ❌",
    });
  }
}); 


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
