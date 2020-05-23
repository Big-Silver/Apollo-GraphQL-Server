import { AuthResponse } from '../../models/interfaces/AuthResponse';
import { createToken } from '../../lib/jwt';
import { User } from '../../models/db/User';

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

async function createUser(
  obj: any,
  { name, email, password }: CreateUserRequest
): Promise<AuthResponse> {
  try {
    const user = new User({
      name,
      email,
      password,
      roles: 'user'
    });
    await user.save();

    return {
      user,
      token: createToken(user)
    };
  } catch (err) {
    throw err;
  }
}

export default createUser;
