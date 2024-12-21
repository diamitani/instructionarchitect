import axios from "axios";

export const OpenAIStream = async (messages) => {
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-turbo",
        messages,
      },
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw new Error("Failed to connect to OpenAI API.");
  }
};
