import type { Document } from 'mongoose';
import type { NextFunction, Request, Response } from 'express';

declare module '@types' {
  type Controller = (
    req: Request,
    res: Response,
    next?: NextFunction
  ) => Promise<void>;

  export type User = {
    username: string,
    name: string,
    email: string,
    phone?: string
  }

  export type UserDocument = Document<User>;
}
