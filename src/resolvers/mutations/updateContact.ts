import { Contact } from '../../models/db/Contact';
import { User } from '../../models/db/User';
import { ContactStatus } from '../../models/interfaces/ContactStatus';
import { ServerContext } from '../../models/interfaces/ServerContext';
import { AuthenticationError } from 'apollo-server-express';

type UpdateContactRequest = {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  status?: ContactStatus;
  contactOwnerId?: number;
};

export default async (
  obj: any,
  { id, name, email, phone, status, contactOwnerId }: UpdateContactRequest,
  { tokenPayload }: ServerContext
): Promise<Contact> => {
  if (!tokenPayload) {
    throw new AuthenticationError('Unauthorized');
  }

  try {
    const contact = await Contact.findByPk(id);

    if (contactOwnerId) {
      const owner = await User.findByPk(contactOwnerId);
      if (!owner) {
        throw new Error('Contact owner not found');
      }

      contact.setContactOwner(owner);
    }
    
    if (name) {
      contact.name = name;
    }
    if (email) {
      contact.email = email;
    }
    if (phone) {
      contact.phone = phone;
    }
    if (status) {
      contact.status = status;
    }
    await contact.save();

    return contact;
  } catch (err) {
    throw err;
  }
}
