import { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import API from "../api/axios";
import socket from "../socket";

function ChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    if (!selectedChat?._id) return;

    try {
      const res = await API.post("/message", {
        content: message,
        chatId: selectedChat._id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleConnect = () => {
      console.log("Connected to socket:", socket.id);
    };

    socket.on("connect", handleConnect);

    return () => socket.off("connect", handleConnect);
  }, []);

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
  }, [selectedChat?._id]);

  const fetchMessages = async () => {
    try {
      const res = await API.get(`/message/${selectedChat._id}`);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!selectedChat?._id) return;

    socket.emit("joinChat", selectedChat._id);
  }, [selectedChat?._id]);

  useEffect(() => {
    const handler = (msg) => {
      const chatId = msg.chat?._id || msg.chat;

      if (chatId === selectedChat?._id) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      }

      setChats((prev) => {
        const updated = prev.map((chat) =>
          chat._id === chatId ? { ...chat, lastMessage: msg } : chat,
        );

        return updated.sort(
          (a, b) =>
            new Date(b.lastMessage?.createdAt || 0) -
            new Date(a.lastMessage?.createdAt || 0),
        );
      });
    };

    socket.on("newMessage", handler);

    return () => socket.off("newMessage", handler);
  }, [selectedChat?._id]);

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
