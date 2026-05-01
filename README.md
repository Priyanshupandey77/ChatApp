# 💬 Real-Time Chat Application

🚀 A full-stack real-time chat application built using **React, Node.js, Express, MongoDB, and Socket.IO** that enables seamless, instant communication between users.

🔗 **Live Demo:** https://chat-app-ruby-pi.vercel.app/  
📦 **GitHub Repository:** https://github.com/Priyanshupandey77/ChatApp.git  

---

## ✨ Key Highlights

- ⚡ Real-time messaging using WebSockets (Socket.IO)
- 🔐 Secure authentication with JWT
- ⌨️ Live typing indicators with debounce optimization
- 💬 One-to-one and group chat support
- ⚡ Optimistic UI for instant message rendering
- 🔄 Auto-scroll to latest messages
- 📜 Persistent chat history (MongoDB)
- 🧠 Efficient state handling and socket synchronization

---

## 🖥️ Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.IO
- JWT Authentication

---

## 🧱 System Architecture


Client (React + Socket.IO Client)
│
│ REST API (Axios)
▼
Server (Node.js + Express)
│
├── MongoDB (Database)
│
└── Socket.IO (Real-time Communication Layer)


---

## 🚀 Features

### 🔐 Authentication
- User Registration
- Login / Logout
- JWT-based session handling

### 💬 Messaging
- Real-time message sending & receiving
- Message persistence in database
- Chat-based message loading

### ⌨️ Typing Indicator
- Shows when another user is typing
- Debounced socket events for performance

### ⚡ Optimistic UI
- Messages appear instantly before backend confirmation

### 👥 Chat System
- One-to-one chat
- Group chat support
- Dynamic chat list updates

---

## 📁 Project Structure


client/
│── components/
│ ├── ChatWindow.jsx
│ ├── MessageInput.jsx
│ ├── Sidebar.jsx
│
│── pages/
│ ├── ChatPage.jsx
│ ├── Login.jsx
│ ├── Register.jsx
│
│── api/
│ ├── axios.js
│
│── socket.js
│── App.jsx

server/
│── controllers/
│── models/
│── routes/
│── middleware/
│── server.js


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Priyanshupandey77/ChatApp.git
cd ChatApp
2️⃣ Backend Setup
cd server
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm run dev
3️⃣ Frontend Setup
cd client
npm install
npm run dev
🔌 Socket Events
Event	Description
joinChat	Join a chat room
typing	Emit when user is typing
stopTyping	Emit when user stops typing
newMessage	Receive new message in real-time
📡 API Endpoints
Auth Routes
POST /auth/register → Register user
POST /auth/login → Login user
POST /auth/logout → Logout user
Chat Routes
GET /chat → Fetch all chats
Message Routes
GET /message/:chatId → Get messages
POST /message → Send message
🧠 Key Engineering Concepts
⚡ Optimistic UI Updates

Improves user experience by rendering messages instantly:

setMessages((prev) => [...prev, tempMessage]);
⌨️ Typing Indicator (Debounced)

Prevents excessive socket calls:

setTimeout(() => {
  socket.emit("stopTyping", selectedChat._id);
}, 1000);
🔄 Real-Time Sync

Ensures all users receive messages instantly:

socket.on("newMessage", handler);
📈 Future Improvements
✔️ Message read receipts (Seen/Delivered)
📎 File & image sharing
🔔 Push notifications
🌙 Dark mode
🔍 Search chats/messages
📄 Pagination for messages
🐛 Known Limitations
Loads all messages at once (no pagination)
No offline support
No media/file sharing
🧪 How to Test
Open the app in two browser tabs
Login with two different users
Start chatting
Observe:
⚡ Instant message delivery
⌨️ Typing indicator
🔄 Real-time updates
🤝 Contributing

Contributions are welcome!

Fork the repository
Create a feature branch
Commit your changes
Open a Pull Request
📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Priyanshu Pandey
GitHub: https://github.com/Priyanshupandey77

⭐ Final Note

If you like this project, consider giving it a ⭐ on GitHub!


---

This version is:
- ✅ Clean
- ✅ Complete
- ✅ Resume + GitHub + recruiter ready
- ✅ No fluff, but still impressive

If you want next-level (seriously standout), I can add:
- 📸 Screenshots section  
- 📊 Performance metrics  
- 🧱 System design diagram image  

Just say *“upgrade it”* 👍
