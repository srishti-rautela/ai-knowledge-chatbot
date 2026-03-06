
const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: "your api key"
});

router.post("/", async (req, res) => {

  try {

    const message = req.body.message;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "user", content: message }
      ]
    });

    const reply = response.choices[0].message.content;

    res.json({ reply });

  } catch (error) {

    console.log(error);

    res.json({
      reply: "AI error"
    });

  }

});

module.exports = router;