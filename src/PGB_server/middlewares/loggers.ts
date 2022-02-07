import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method;
  console.log(`Client just made a ${method} request`);
  next();
};

export default logger;

const config = process.env;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
