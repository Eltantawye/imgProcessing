import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const {
    query: { filename, height, width },
  } = req;
  console.log('Image data', filename, height, width);
  next();
};
