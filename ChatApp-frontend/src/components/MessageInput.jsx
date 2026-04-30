import { useState } from "react";
import socket from "../socket.js";
import { useRef } from "react";

function MessageInput({ onSend, selectedChat }) {
  const [input, setInput] = useState("");
  const isTyping = useRef(false);
  const typingTimeout = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!selectedChat?._id) return;

    if (!isTyping.current) {
      socket.emit("typing", selectedChat._id);
      isTyping.current = true;
    }

    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", selectedChat._id);
      isTyping.current = false;
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    onSend(input);
    setInput("");
    socket.emit("stopTyping", selectedChat._id);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center p-3 bg-white border-t gap-2"
    >
      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={handleChange}
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;
