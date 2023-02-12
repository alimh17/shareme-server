import _ from "lodash";
import Post from "../../../models/Post/Post";
import User from "../../../models/User/User";

const getFollowingPosts = async (decoded: any) => {
  const user = await User.findOne({ username: decoded.user.username });

  const posts: any = await Post.find({});

  //! Filter posts based on the user's following list

  const filter = user?.followings.map((following: any) => {
    return posts.filter((post: any) => post.owner.name === following?.username);
  });

  const flat = _.flatten(filter);

  //! Sort posts by publication time
  const sorted = flat.sort(function (a: any, b: any) {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
  });

  return sorted;
};

export default getFollowingPosts;
