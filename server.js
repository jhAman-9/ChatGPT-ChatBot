const PORT = 8000;

const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

app.use(express.json());
app.use(cors());

app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + REACT_APP_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.messages }],
      max_tokens: 100,
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/audio/translations",
      options
    );

    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT || 3000, () => {
  console.log("Your server is listening on PORT: " + PORT);
});
