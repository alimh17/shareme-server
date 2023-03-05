import { Request, Response } from "express";
import Post from "../../../models/Post/Post";
import User from "../../../models/User/User";

const removeLike = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "User is not exist" });
    }
    const { username, profile, _id } = user;

    //! remove like for post schema
    await Post.updateOne(
      { _id: req.body.postId },
      {
        $pull: { like: { username, profile, _id } },
      }
    );

    //! remove new comment for posts user schema
    await User.updateMany(
      { username: req.body.owner },
      { $pull: { "posts.$[].like": { username, profile, _id } } }
    );

    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed , please try again" });
  }
};

export default removeLike;
