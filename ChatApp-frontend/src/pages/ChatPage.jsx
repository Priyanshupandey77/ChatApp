import { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import API from "../api/axios";

function ChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    if (!selectedChat?._id) return;

    const tempMessage = {
      _id: Date.now(),
      sender: { name: "You" },
      content: message,
    };

    setMessages((prev) => [...prev, tempMessage]);
    try {
      const res = await API.post("/message", {
        content: message,
        chatId: selectedChat._id,
      });

      setMessages((prev) =>
        prev.map((msg) => (msg._id === tempMessage._id ? res.data : msg)),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await API.get("/chat");
      setChats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      setMessages([]);
      fetchMessages();
    }
  }, [selectedChat]);

  const fetchMessages = async () => {
    try {
      const res = await API.get(`/message/${selectedChat._id}`);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar chats={chats} setSelectedChat={setSelectedChat} />
      <ChatWindow
        selectedChat={selectedChat}
        messages={messages}
        onSend={handleSendMessage}
      />
    </div>
  );
}

export default ChatPage;
