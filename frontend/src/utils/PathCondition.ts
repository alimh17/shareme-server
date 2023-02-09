export const PathCondition = (path: string) => {
  switch (path) {
    case '/register':
      return false;
    case '/login':
      return false;
    case '/404':
      return false;
    default:
      return true;
  }
};
