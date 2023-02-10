import _ from "lodash";
import User from "../../../models/User/User";

const getFollowingPosts = async (decoded: any) => {
  const user = await User.findOne({ username: decoded.user.username });

  const posts: any = user?.followings.map((user: any) => {
    return user.posts;
  });

  const flat = _.flatten(posts);

  const sorted = flat.sort(function (a: any, b: any) {
    return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
  });

  return sorted;
};

export default getFollowingPosts;
