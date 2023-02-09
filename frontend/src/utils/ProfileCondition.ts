export const ProfileCondition = (profile: string, username: string) => {
  if (profile === username) {
    return true;
  } else {
    return false;
  }
};
