import User from "../../../models/User/User";

const updatePostList = async (username: string , post : any) => {
  const user = await User.findOne({ username });

  if (!user) {
    return;
  }

  //! Get the list of followers
  const followers = await User.find({
    "followings.username": username,
  });

  for (const follower of followers) {
    //! Update the information in the follower's following list
    await User.findOneAndUpdate(
      { username: follower.username, "followings.username": username },
      { "followings.$.posts": post }
    );
  }
};

export default updatePostList;
