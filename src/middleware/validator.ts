import { Request, Response, NextFunction } from 'express';

export const validatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    query: { filename, height, width },
  } = req;

  if (!filename || !parseInt(width as string) || !parseInt(height as string)) {
    res
      .status(404)
      .send(
        'Image is not found please provide valid url ex: http://localhost:3000/image?filename=fjord&width=350&height=350'
      );
    return;
  }
  next();
};
