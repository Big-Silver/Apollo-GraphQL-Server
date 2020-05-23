import { JWTTokenPayload } from './JWTTokenPayload';

export interface ServerContext {
  tokenPayload: JWTTokenPayload;
}
