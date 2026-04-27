import MessageInput from "./MessageInput";

function ChatWindow({ selectedChat, messages, onSend }) {
  if (!selectedChat) {
    return (
      <div className="w-[70%] flex items-center justify-center text-gray-500">
        Select a chat
      </div>
    );
  }

  return (
    <div className="w-[70%] flex flex-col bg-gray-100">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white p-2 rounded-lg shadow-sm">
            <strong className="text-xs text-gray-500">
              {msg.sender?.name || "You"}
            </strong>
            <p className="text-sm text-gray-800">{msg.content}</p>
          </div>
        ))}
      </div>

      <MessageInput onSend={onSend} />
    </div>
  );
}

export default ChatWindow;
