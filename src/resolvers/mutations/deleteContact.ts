import { Contact } from '../../models/db/Contact';
import { ServerContext } from '../../models/interfaces/ServerContext';
import { AuthenticationError } from 'apollo-server-express';

type DeleteContactRequest = {
  id: number;
};

export default async (
  obj: any,
  { id }: DeleteContactRequest,
  { tokenPayload }: ServerContext
): Promise<void> => {
  if (!tokenPayload) {
    throw new AuthenticationError('Unauthorized');
  }

  try {
    await Contact.destroy({
      where: { id }
    });
  } catch (err) {
    throw err;
  }
}
