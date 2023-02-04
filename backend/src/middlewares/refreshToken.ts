import jwt from "jsonwebtoken";
const refreshTokenGenerator = (user: object) => {
  const secret: string | undefined = process.env.SECRET_KEY;
  const refreshToken = jwt.sign({ user }, secret as string, {
    expiresIn: `${1000 * 365 * 60}d`,
  });

  return refreshToken;
};

export default refreshTokenGenerator;
