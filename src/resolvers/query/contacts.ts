import { ServerContext } from '../../models/interfaces/ServerContext';
import { Contact } from '../../models/db/Contact';
import { AuthenticationError } from 'apollo-server-express';

export default async (
  obj: any,
  args: any,
  { tokenPayload }: ServerContext
): Promise<Contact[]> => {
  if (!tokenPayload) {
    throw new AuthenticationError('Unauthorized');
  }

  try {
    const contacts = await Contact.findAll();
    return contacts;
  } catch (err) {
    throw new Error('Unknown error');
  }
};
