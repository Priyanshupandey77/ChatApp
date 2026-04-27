function Sidebar({ chats, setSelectedChat }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!chats.length) {
    return <div style={{ width: "30%", padding: "10px" }}>No chats yet</div>;
  }
  return (
    <div
      style={{ width: "30%", borderRight: "1px solid gray", padding: "10px" }}
    >
      <h3>Chats</h3>
      {chats.map((chat) => {
        const otherUser = chat.users?.find((u) => u._id !== user._id);

        return (
          <div
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #eee",
            }}
          >
            {chat.isGroup ? chat.groupName : otherUser?.name || "Unknown"}
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;
