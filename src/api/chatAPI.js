export const fetchChatResponse = async (messages) => {
    try {
      const response = await fetch("http://localhost:5000/api/chatAPI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch chat response: ${errorText}`);
      }
  
      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error("❌ Frontend Chat API Error:", error.message);
      throw error;
    }
  };
  