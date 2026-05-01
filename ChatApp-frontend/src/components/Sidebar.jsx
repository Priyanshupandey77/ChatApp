import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { HiOutlineLogout } from "react-icons/hi";

function Sidebar({ chats, setSelectedChat }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

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
    <div className="w-[30%] bg-gray-900 text-white border-r border-gray-800 flex flex-col">
      <h3 className="p-4 text-lg font-semibold border-b border-gray-800">
        Chats
      </h3>

      <button
        onClick={handleLogout}
        className="m-2 flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded"
      >
        <HiOutlineLogout size={16} />
        <span className="text-sm font-medium">Logout</span>
      </button>

      <div className="flex-1 overflow-y-auto">
        {!chats.length ? (
          <p className="p-4 text-gray-400 text-sm">No chats yet</p>
        ) : (
          chats.map((chat) => {
            const otherUser = chat.users?.find((u) => u._id !== user._id);

            return (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className="p-4 cursor-pointer border-b border-gray-800 hover:bg-gray-800 transition"
              >
                <p className="font-medium">
                  {chat.isGroup ? chat.groupName : otherUser?.name || "Unknown"}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Sidebar;
