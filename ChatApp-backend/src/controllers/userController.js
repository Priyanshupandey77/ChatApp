import User from "../models/User.js";

export const searchUsers = async (req, res) => {
    try {
        const keyword = req.query.search?{
            $or: [
                {name: {$regex: req.query.search, $options: "i"}},
                {email: {$regex: req.query.search, $options: "i"}},
            ]
        }:{};

        const users = await User.find(keyword).find({
            _id: {$ne: req.user._id},
        });

        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}