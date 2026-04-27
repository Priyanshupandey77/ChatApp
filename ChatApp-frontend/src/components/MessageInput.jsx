import { useState } from "react";

function MessageInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="write your msg..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageInput;
