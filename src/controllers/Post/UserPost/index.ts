import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import User from "../../../models/User/User";

const userPost = async (req: Request, res: Response) => {
  try {
    //! Here decoded access token and get user data
    // const token = req.headers.authorization?.slice(
    //   7,
    //   req.headers.authorization.length
    // );
    // const decoded: any = await decode(token || "");

    // if (!decoded) {
    //   return res.status(409).json({ message: "token is not valid or expired" });
    // }

    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.status(404).json({ message: "User is not exist" });
    }

    //! Sort posts by publication time
    const posts = user.posts.sort(function (a: any, b: any) {
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    });

    //! Here pagnation posts
    const page: number = req.query.page ? +req.query.page : 1;
    const pageSize: number = req.query.pageSize ? +req.query.pageSize : 4;

    const startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    endIndex = endIndex > posts.length ? posts.length : endIndex;
    const hasNext: boolean = endIndex < posts.length;
    const paginatedData = posts.slice(startIndex, endIndex);

    return res.status(200).json({
      message: "success",
      posts: paginatedData,
      next: hasNext,
      postsLength: posts.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed , please try again" });
  }
};

export default userPost;
