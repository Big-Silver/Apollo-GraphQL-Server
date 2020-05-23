import jwt from 'jsonwebtoken';

import { User } from '../models/db/User';
import { JWTTokenPayload } from '../models/interfaces/JWTTokenPayload';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
const JWT_EXPIRES = +process.env.JWT_EXPIRES || 3600;

export const createToken = (user: User): string =>
  jwt.sign(
    {
      id: user.id,
      roles: user.roles
    },
    JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: JWT_EXPIRES
    }
  );

export const decodeToken = (token: string): JWTTokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTTokenPayload;
  } catch (err) {
    return null;
  }
};
