import { Request, Response } from "express";
import User from "../../models/User/User";

const searchController = async (req: Request, res: Response) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User is not exist" });
    }

    const data = { username: user?.username, profile: user?.profile };

    return res.status(200).json({ message: "success", data });
  } catch (err) {
    return res.status(500).json({ message: "Failed , please try again" });
  }
};

export default searchController;
