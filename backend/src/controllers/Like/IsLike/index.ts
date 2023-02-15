import { Request, Response } from "express";
import Post from "../../../models/Post/Post";

const IsLike = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({ _id: req.body.postId });
    // const hasLike = post?.like.includes(req.body.username);
    const hasLike = post?.like.find(
      (user: any) => user.username === req.body.username
    );
    if (hasLike) {
      return res.status(200).json({ message: "success", status: true });
    }
    return res.status(200).json({ message: "success", status: false });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed , Please try again" });
  }
};

export default IsLike;
