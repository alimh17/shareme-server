import { Request, Response } from "express";
import { decode } from "jsonwebtoken";
import getFollowingPosts from "./getFollowingPosts";

//! Here we return all the posts of users who are in the following list
const getPosts = async (req: Request, res: Response) => {
  try {
    //! Here decoded access token and get user data
    const token = req.headers.authorization?.slice(
      7,
      req.headers.authorization.length
    );
    const decoded: any = await decode(token || "");

    if (!decoded) {
      return res.status(409).json({ message: "token is not valid or expired" });
    }

    //! Here get followings post and sorte with published time
    const followingPosts = await getFollowingPosts(decoded);

    //! Here pagination
    const page: number = req.query.page ? +req.query.page : 1;
    const pageSize: number = req.query.pageSize ? +req.query.pageSize : 4;

    const startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;

    endIndex =
      endIndex > followingPosts.length ? followingPosts.length : endIndex;
    const hasNext: boolean = endIndex < followingPosts.length;
    const paginatedData = followingPosts.slice(startIndex, endIndex);

    return res.status(200).json({
      message: "success",
      posts: paginatedData,
      next: hasNext,
      postsLength: followingPosts.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed , please try again" });
    process.exit(1);
  }
};

export default getPosts;
