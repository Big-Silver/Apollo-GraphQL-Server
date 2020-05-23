import { ServerContext } from '../../models/interfaces/ServerContext';
import { Contact } from '../../models/db/Contact';
import { AuthenticationError } from 'apollo-server-express';

type GetContactRequest = {
  id: number;
};

export default async (
  obj: any,
  { id }: GetContactRequest,
  { tokenPayload }: ServerContext
): Promise<Contact> => {
  if (!tokenPayload) {
    throw new AuthenticationError('Unauthorized');
  }

  try {
    const contact = await Contact.findByPk(id);
    return contact;
  } catch (err) {
    throw new Error('Unknown error');
  }
};
