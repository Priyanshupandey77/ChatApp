import MessageInput from "./MessageInput";

function ChatWindow({selectedChat, messages, onSend }) {
  if (!selectedChat) {
    return <div>Select a chat</div>;
  }

  return (
    <div style={{ width: "70%", padding: "10px" }}>
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.sender?.name || "You"}:</strong>
          {msg.content}
        </div>
      ))}
      <MessageInput onSend={onSend} />
    </div>
  );
}

export default ChatWindow;
