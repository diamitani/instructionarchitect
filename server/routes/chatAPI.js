import express from "express";
import { OpenAIStream } from "../utils/openaiStream.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { messages } = req.body;

  const initialSystemMessage = {
    role: "system",
    content:
      "You are an assistant that helps users find resources in Chicago, such as housing, food, and more. Respond with concise and actionable guidance.",
  };

  const updatedMessages = [initialSystemMessage, ...messages];

  try {
    const response = await OpenAIStream(updatedMessages);
    res.status(200).json({ content: response });
  } catch (error) {
    console.error("Error in chatAPI route:", error);
    res.status(500).json({ error: "Unable to fetch OpenAI response." });
  }
});

export default router;
