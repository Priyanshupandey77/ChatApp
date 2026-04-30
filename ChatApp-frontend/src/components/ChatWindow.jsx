import { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";

function ChatWindow({ selectedChat, messages, onSend, isTyping }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!selectedChat) {
    return (
      <div className="w-[70%] flex items-center justify-center text-gray-500">
        Select a chat
      </div>
    );
  }

  return (
    <div className="w-[70%] flex flex-col bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => {
          const isMe = msg.sender?._id === user._id;

          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div className="bg-white p-2 rounded-lg shadow-sm max-w-xs">
                <strong className="text-xs text-gray-500">
                  {isMe ? "You" : msg.sender?.name || "User"}
                </strong>
                <p className="text-sm text-gray-800">{msg.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {isTyping && (
        <div className="text-sm text-gray-500 px-4 pb-2">Typing...</div>
      )}
      <MessageInput onSend={onSend} selectedChat={selectedChat} />
    </div>
  );
}

export default ChatWindow;
