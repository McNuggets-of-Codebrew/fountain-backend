import type { NextFunction, Request, Response } from 'express';

type Controller = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<void>;

declare module '@controllers/user';
