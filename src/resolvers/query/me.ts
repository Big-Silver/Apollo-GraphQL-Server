import { ServerContext } from '../../models/interfaces/ServerContext';
import { User } from '../../models/db/User';
import { AuthenticationError } from 'apollo-server-express';

export default async (
  obj: any,
  args: any,
  { tokenPayload }: ServerContext
): Promise<User> => {
  try {
    const user = await User.findByPk(tokenPayload.id);
    return user;
  } catch (err) {
    throw new AuthenticationError('Invalid token');
  }
};
