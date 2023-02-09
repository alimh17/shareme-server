import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const Authorization = (req: Request, res: Response, next: NextFunction) => {
  const token: any =
    req.headers["authorization"] || req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send("Access token is required.");
  }

  try {
    jwt.verify(token.slice(7, token.length), process.env.SECRET_KEY || "");
    next();
  } catch (err) {
    return res.status(401).send("Access token is invalid or has expired.");
  }
};

export default Authorization;
