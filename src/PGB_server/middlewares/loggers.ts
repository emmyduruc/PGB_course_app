import express, { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method;
  console.log(`Client just made a ${method} request`);
  next();
};

export default logger;
