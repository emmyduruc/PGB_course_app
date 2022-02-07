import express, { Request, Response, NextFunction } from "express";

export const welcome = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send("Welcome 🙌 ");
};
