import { Contact } from '../../models/db/Contact';
import { ContactStatus } from '../../models/interfaces/ContactStatus';
import { ServerContext } from '../../models/interfaces/ServerContext';
import { AuthenticationError } from 'apollo-server-express';

type CreateContactRequest = {
  name: string;
  email: string;
  phone: string;
};

export default async (
  obj: any,
  { name, email, phone }: CreateContactRequest,
  { tokenPayload }: ServerContext
): Promise<Contact> => {
  if (!tokenPayload) {
    throw new AuthenticationError('Unauthorized');
  }

  try {
    const contact = new Contact({
      name,
      email,
      phone,
      status: ContactStatus.NOT_ATTEMPTED
    });
    await contact.save();

    return contact;
  } catch (err) {
    throw err;
  }
}
