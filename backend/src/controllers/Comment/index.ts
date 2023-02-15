import { Request, Response } from "express";
import Post from "../../models/Post/Post";
import User from "../../models/User/User";

const Comment = async (req: Request, res: Response) => {
  try {
    //! Add new comment for post schema
    await Post.updateMany(
      { _id: req.body.from },
      { $push: { comment: req.body } }
    );

    const post: any = await Post.findOne({ _id: req.body.from });

    //! Add new comment for posts user schema
    await User.updateMany(
      { username: post?.owner?.name },
      { $push: { "posts.$[].comment": req.body } }
    );

    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed , Please try again" });
  }
};

export default Comment;
