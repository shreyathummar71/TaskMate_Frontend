import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfHelpByAIInterface = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch existing chat messages from the backend
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "https://backend-taskmate.onrender.com/helpbyaiprofessional"
        );
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
        "https://backend-taskmate.onrender.com/helpbyaiprofessional",
        {
          message: input,
        }
      );
      const aiResponse = response.data.messages;
      setMessages([
        ...messages,
        newMessage,
        { role: "assistant", content: aiResponse },
      ]);
      console.log("aiResponse :", response);
    } catch (error) {
      console.error("Error with AI request:", error);
      alert("An error occurred. Please try again.");
    }

    setInput("");
  };

  const renderMessageContent = (message) => {
    if (Array.isArray(message)) {
      const assistantMessage = message.find((msg) => msg.role === "assistant");
      return assistantMessage ? assistantMessage.content : "";
    } else if (typeof message === "object" && message.content) {
      return message.content;
    } else if (typeof message === "string") {
      return message;
    }
    return "";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-primary p-8 rounded-lg shadow-lg w-[90%] max-w-lg h-auto max-h-[700px] overflow-auto">
        <h2 className="text-xl font-primary text-secondary text-center mb-4">
          Help By AI
        </h2>

        <div className="space-y-4">
          <div className="h-80 overflow-y-auto bg-tertiary bg-opacity-60 p-4 rounded-md">
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
                      ? "bg-secondary text-white"
                      : "bg-primary text-white"
                  }`}
                >
                  {renderMessageContent(msg.content)}
                </span>
              </div>
            ))}
          </div>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="block w-full px-3 py-2 text-sm border rounded-md border-secondary bg-tertiary bg-opacity-60 text-primary"
          />

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleSend}
              className="bg-tertiary bg-opacity-60 border border-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary hover:border-white"
            >
              Send
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-tertiary bg-opacity-60 border border-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary hover:border-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfHelpByAIInterface;
