function Sidebar({ chats, setSelectedChat }) {
  return (
    <div style={{ width: "30%", borderRight: "1px solid gray" }}>
      {chats.map((chat) => (
        <div key={chat.id} onClick={() => setSelectedChat(chat)}>
          {chat.name}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
