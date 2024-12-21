import express from "express";
import cors from "cors";
import chatAPI from "./routes/chatAPI.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// ✅ Mount the chatAPI route
app.use("/api/chatAPI", chatAPI);

// ✅ Root health check
app.get("/", (req, res) => {
  res.status(200).send("Backend is running! Use /api/chatAPI for chat functionality.");
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
