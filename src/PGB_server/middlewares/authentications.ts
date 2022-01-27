import express, { Request, Response, NextFunction } from "express";

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers;
  const isLoggedIn = headers.is_logged_in;
  if (isLoggedIn) {
    next();
  } else {
    res.status(401).send(`Please Login`);
  }
};

export default authentication;
