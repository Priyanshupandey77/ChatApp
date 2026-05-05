import { useEffect, useRef, useState } from "react";
import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";
import API from "../api/axios";
import socket from "../socket";

function ChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unread, setUnread] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const selectedChatRef = useRef(null);
  const userRef = useRef(JSON.parse(localStorage.getItem("user") || "{}"));

  useEffect(() => {
    const handleTyping = (chatId) => {
      if (chatId === selectedChatRef.current?._id) {
        setIsTyping(true);
      }
    };

    const handleStopTyping = (chatId) => {
      if (chatId === selectedChatRef.current?._id) {
        setIsTyping(false);
      }
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, []);

  useEffect(() => {
    if (selectedChat?._id) {
      socket.emit("stopTyping", selectedChat._id);
    }
    setIsTyping(false);
  }, [selectedChat?._id]);

  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  const handleSendMessage = async (message) => {
    if (!selectedChat?._id) return;

    const tempMessage = {
      _id: Date.now(),
      sender: {
        _id: userRef.current._id,
        name: userRef.current.name,
      },
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
    const chatId = selectedChat?._id;
    if (!chatId) return;

    setMessages([]);
    fetchMessages(chatId);
  }, [selectedChat?._id]);

  const fetchMessages = async (chatId) => {
    if (!chatId) return;

    try {
      const res = await API.get(`/message/${chatId}`);
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
      if (!msg?.chat) return;

      const chatId = msg.chat?._id || msg.chat;
      const isMe = msg.sender?._id === userRef.current._id;

      if (chatId === selectedChatRef.current?._id) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === msg._id)) return prev;
          return [...prev, msg];
        });
      }

      if (!isMe && chatId !== selectedChatRef.current?._id) {
        setUnread((prev) => ({
          ...prev,
          [chatId]: (prev[chatId] || 0) + 1,
        }));
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
  }, []);

  useEffect(() => {
    if (!selectedChat?._id) return;

    setUnread((prev) => ({
      ...prev,
      [selectedChat._id]: 0,
    }));
  }, [selectedChat?._id]);

  useEffect(() => {
    return () => {
      if (selectedChatRef.current?._id) {
        socket.emit("stopTyping", selectedChatRef.current._id);
      }
    };
  }, []);

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      <Sidebar
        chats={chats}
        setChats={setChats}
        unread={unread}
        setSelectedChat={setSelectedChat}
        selectedChat={selectedChat}
        isOpen={!selectedChat}
      />
      <ChatWindow
        selectedChat={selectedChat}
        messages={messages}
        onSend={handleSendMessage}
        isTyping={isTyping}
        goBack={() => setSelectedChat(null)}
      />
    </div>
  );
}

export default ChatPage;
