import _ from "lodash";
import User from "../../../models/User/User";

const findFollowings = async (user: any) => {
  //! Here get user followings names
  const names = user.followings.map((following: any) => following.username);
  //   { username: { $in: names } }

  //! Here get data following users
  const data = await User.find({ username: { $in: names } });

  //! Here get followers data of following users
  const followers: any[] = data.map((following: any) => {
    return following.followers;
  });

  //! Here flat Array
  const flat = _.flatten(followers);

  //! Here filter by user username
  const filter = flat.filter((f: any) => f.username !== user.username);

  //! Here uniq data
  const uniqueData = filter.filter(
    (obj, index, self) =>
      index === self.findIndex((o) => o.username === obj.username)
  );

  //! Here get followers user
  const myFollowers = user.followers.map((follower: any) => follower.username);

  //! Here we check whether the following followers are in the user's following list or not
  const filteredUsers = uniqueData.filter(
    (user) => !myFollowers.includes(user.username)
  );

  //! Here we check whether the following followers are in the user's followers list or not
  const filterByFollowing = filteredUsers.filter(
    (user) => !names.includes(user.username)
  );

  return filterByFollowing;
};

export default findFollowings;
