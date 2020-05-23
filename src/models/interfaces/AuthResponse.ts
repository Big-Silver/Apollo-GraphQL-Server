import { User } from '../db/User';

export interface AuthResponse {
  user?: User;
  token?: String;
}
