import { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";

function ChatWindow({ selectedChat, messages, onSend, isTyping, goBack }) {
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
    <div
      className={`${
        selectedChat ? "flex" : "hidden"
      } md:flex w-full md:w-1/3 flex-col bg-gray-50 h-screen`}
    >
      <div className="flex items-center gap-3 p-3 bg-white border-b shadow-sm sticky top-0 z-10">
        {/* Back button */}
        <button
          onClick={goBack}
         className="md:hidden text-blue-500 text-lg px-2 py-1"
        >
          ←
        </button>

        <p className="font-semibold text-gray-800">
          {selectedChat?.isGroup
            ? selectedChat.groupName
            : selectedChat?.users?.find((u) => u._id !== user._id)?.name}
        </p>
      </div>
      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0">
        {messages.map((msg) => {
          const isMe = msg.sender?._id === user._id;

          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-3/4 px-4 py-2 rounded-2xl shadow-sm ${
                  isMe
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="text-sm leading-snug">{msg.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      

      {/* TYPING */}
      {isTyping && (
        <div className="text-xs text-gray-500 px-4 pb-2 italic">Typing...</div>
      )}

      {/* INPUT */}
      <div className="border-t bg-white">
        <MessageInput onSend={onSend} selectedChat={selectedChat} />
      </div>
    </div>
  );
}

export default ChatWindow;
