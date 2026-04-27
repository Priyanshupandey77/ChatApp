import Chat from "../models/Chat.js";

export const CreateOrAccessChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const currentUser = req.user._id;

    if (!userId) {
      return res.status(400).json({ msg: "userId is required" });
    }

    if (currentUser.toString() === userId) {
      return res.status(400).json({ msg: "userid cannot be of currentUser" });
    }

    const chat = await Chat.findOne({
      isGroup: false,
      users: { $all: [currentUser, userId] },
    }).populate("users", "-password");

    if (chat) {
      return res.json(chat);
    }

    const newChat = await Chat.create({
      users: [currentUser, userId],
      isGroup: false,
    });

    const fullChat = await Chat.findById(newChat._id).populate(
      "users",
      "-password",
    );
    return res.status(201).json(fullChat);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "name email")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
