import { Request } from 'express';
import { JWTTokenPayload } from '../models/interfaces/JWTTokenPayload';
import { ServerContext } from '../models/interfaces/ServerContext';
import { decodeToken } from './jwt';

type ContextFuncParams = {
  req: Request;
};

export const buildContext = ({ req }: ContextFuncParams): ServerContext => {
  const token = req.headers.authorization;
  const tokenPayload: JWTTokenPayload = decodeToken(token);

  return { tokenPayload };
};
