import { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";

function ChatPage() {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Kunal",
      messages: [
        { id: 1, sender: "me", content: "Hello Kunal" },
        { id: 2, sender: "Kunal", content: "Hi bro" },
      ],
    },
    {
      id: 2,
      name: "Rahul",
      messages: [
        { id: 1, sender: "me", content: "Hey Rahul" },
        { id: 2, sender: "Rahul", content: "Hello!" },
      ],
    },
  ]);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSendMessage = (message) => {
    if (!selectedChat) return;
    const newMessage = {
      id: Date.now(),
      sender: "me",
      content: message,
    };

    const updatedChats = chats.map((chat) => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
        };
      }
      return chat;
    });
    setChats(updatedChats);
    setSelectedChat(updatedChats.find((chat) => chat.id === selectedChat.id));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar chats={chats} setSelectedChat={setSelectedChat} />
      <ChatWindow selectedChat={selectedChat} onSend={handleSendMessage} />
    </div>
  );
}

export default ChatPage;
