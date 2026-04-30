import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    const sender = req.user._id;
    if (!content) {
      return res.status(400).json({ msg: "content is required" });
    }
    if (!chatId) {
      return res.status(400).json({ msg: "chatId not found" });
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ msg: "chat not found" });
    }
    const isUserInChat = chat.users.some(
      (user) => user.toString() === req.user._id.toString(),
    );
    if (!isUserInChat) {
      return res.status(403).json({ msg: "Not authorized" });
    }
    const message = await Message.create({
      sender,
      chat: chatId,
      content,
      seenBy: [sender],
    });

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: message._id,
    });

    await message.populate([
      { path: "chat", select: "users" },
      { path: "sender", select: "name email" },
    ]);

    req.io.to(chatId).emit("newMessage", message);

    return res.status(201).json({ ...message._doc, __v: undefined });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      return res.status(400).json({ msg: "chatId is required" });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ msg: "chat not found" });
    }

    const isUserInChat = chat.users.some(
      (user) => user.toString() === req.user._id.toString(),
    );

    if (!isUserInChat) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name email")
      .populate("chat", "users")
      .select("-__v")
      .sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
