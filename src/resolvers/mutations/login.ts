import { AuthResponse } from '../../models/interfaces/AuthResponse';
import { AuthenticationError } from 'apollo-server-express';
import { User } from '../../models/db/User';
import { createToken } from '../../lib/jwt';

type LoginInput = {
  email: string;
  password: string;
};

async function login(
  obj: any,
  { email, password }: LoginInput
): Promise<AuthResponse> {
  try {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user.checkPassword(password)) {
      throw new AuthenticationError('Invalid credentials');
    }

    return {
      user,
      token: createToken(user)
    };
  } catch (err) {
    throw new AuthenticationError('Invalid credentials');
  }
}

export default login;
