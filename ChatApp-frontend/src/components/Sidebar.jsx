import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { HiOutlineLogout } from "react-icons/hi";
import { useState } from "react";

function Sidebar({
  chats,
  setChats,
  setSelectedChat,
  isOpen,
  unread,
  selectedChat,
}) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setUsers([]);
      return;
    }
    try {
      const res = await API.get(`/user?search=${value}`);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartChat = async (userId) => {
    try {
      const res = await API.post("/chat", { userId });

      const newChat = res.data;

      setChats((prev) => {
        const exists = prev.find((c) => c._id === newChat._id);
        if (exists) return prev;

        return [newChat, ...prev];
      });

      setSelectedChat(newChat);

      setQuery("");
      setUsers([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout", {}, { withCredentials: true });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } md:flex w-full md:w-1/3 bg-gray-900 text-white border-r border-gray-800 flex-col`}
    >
      {/* HEADER */}
      <h3 className="p-4 text-lg font-semibold border-b border-gray-800 tracking-wide">
        Chats
      </h3>

      {/* SEARCH */}
      <div className="px-3 pt-3">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search users..."
          className="w-full px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto mt-3">
        {query ? (
          users.length ? (
            users.map((u) => (
              <div
                key={u._id}
                onClick={() => handleStartChat(u._id)}
                className="px-4 py-3 cursor-pointer border-b border-gray-800 hover:bg-gray-800 transition"
              >
                <p className="font-medium text-sm">{u.name}</p>
                <p className="text-xs text-gray-400 truncate">{u.email}</p>
              </div>
            ))
          ) : (
            <p className="p-4 text-gray-400 text-sm text-center">
              No users found
            </p>
          )
        ) : (
          chats.map((chat) => {
            const otherUser = chat.users?.find((u) => u._id !== user._id);

            return (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`px-4 py-3 cursor-pointer border-b border-gray-800 transition ${
                  selectedChat?._id === chat._id
                    ? "bg-gray-800 border-l-4 border-blue-500"
                    : "hover:bg-gray-800"
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-sm">
                    {chat.isGroup
                      ? chat.groupName
                      : otherUser?.name || "Unknown"}
                  </p>
                  {unread[chat._id] > 0 && (
                    <span className="bg-blue-500 text-white text-[10px] min-w-4.5 h-4.5 flex items-center justify-center rounded-full">
                      {unread[chat._id]}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 truncate">
                  {chat.lastMessage
                    ? `${chat.lastMessage.sender?.name === user.name ? "You: " : ""}${chat.lastMessage.content}`
                    : "No messages yet"}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mx-3 mt-3 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm transition"
      >
        <HiOutlineLogout size={16} />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
