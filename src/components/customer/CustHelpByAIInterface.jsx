import React, { useState, useEffect } from "react";
import axios from "axios";

const CustHelpByAIInterface = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch existing chat messages from the backend
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/chat");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/ai-response",
        { message: input }
      );
      const aiResponse = response.data.response;
      setMessages([
        ...messages,
        newMessage,
        { role: "assistant", content: aiResponse },
      ]);
    } catch (error) {
      console.error("Error with AI request:", error);
      alert("An error occurred. Please try again.");
    }

    setInput("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 font-primary text-primary text-center">
        Help By AI
      </h2>
      <div className="space-y-4">
        <div className="h-64 overflow-y-auto bg-gray-100 p-4 rounded-md">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-2 border font-primary text-tertiary bg-gray-300 rounded-md"
        />
        <button
          onClick={handleSend}
          className="w-full py-2 px-4 border font-secondary border-secondary bg-tertiary text-white rounded-md hover:bg-secondary"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CustHelpByAIInterface;
