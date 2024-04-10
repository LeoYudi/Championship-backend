import { NextFunction, Request, Response } from 'express';

const errorHandler = async (err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.log(err);
  return res.status(500).json({ error: 'internal server error' });
};

export { errorHandler };
