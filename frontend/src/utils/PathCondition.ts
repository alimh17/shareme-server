export const PathCondition = (path: string) => {
  switch (path) {
    case '/register':
      return false;
    case '/login':
      return false;
    case '/code':
      return false;
    case '/follow-page':
      return false;
    case '/forget-password':
      return false;
    case '/404':
      return false;
    default:
      return true;
  }
};
