import React, { useState, useEffect } from "react";
import { fetchChatResponse } from "../api/chatAPI";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initialMessage = {
      role: "assistant",
      content:
        "Please tell me your prompt or what you want to build, and I'll create system instructions for you.",
    };
    setMessages([initialMessage]);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const assistantResponse = await fetchChatResponse(updatedMessages);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantResponse },
      ]);
    } catch (error) {
      console.error("Error fetching assistant response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Error: Unable to fetch response. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white text-center p-4">
        <h1 className="text-2xl font-bold">Instruction Architect Chat</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-md ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto max-w-md"
                : "bg-gray-200 text-black max-w-md"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="text-gray-500 animate-pulse">Typing...</div>
        )}
      </main>
      <footer className="p-4 bg-white border-t flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your prompt..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 p-2 border rounded-l-md"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default AIChat;
