function Sidebar({ chats, setSelectedChat }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!chats.length) {
    return (
      <div className="w-[30%] p-4 bg-gray-900 text-white">No chats yet</div>
    );
  }
  return (
    <div className="w-[30%] bg-gray-900 text-white border-r border-gray-800 flex flex-col">
      <h3 className="p-4 text-lg font-semibold border-b border-gray-800">
        Chats
      </h3>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => {
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
        })}
      </div>
    </div>
  );
}

export default Sidebar;
