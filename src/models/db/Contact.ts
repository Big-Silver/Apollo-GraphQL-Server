import {
  Model,
  DataTypes,
  Association,
  BelongsToGetAssociationMixin,
  BelongsToCreateAssociationMixin,
  BelongsToSetAssociationMixin
} from 'sequelize';
import { User } from './User';
import { sequelize } from './sequelize';
import { ContactStatus } from '../interfaces/ContactStatus';

export class Contact extends Model {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: ContactStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  contactOwner(): Promise<User> {
    return this.getContactOwner();
  }

  getContactOwner: BelongsToGetAssociationMixin<User>;
  addContactOwner: BelongsToCreateAssociationMixin<User>;
  setContactOwner: BelongsToSetAssociationMixin<User, number>;

  public static associations: {
    contactOwner: Association<Contact, User>;
  };
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      unique: true
    },
    status: {
      type: DataTypes.STRING
    },
    contactOwnerId: {
      type: DataTypes.NUMBER
    }
  },
  {
    sequelize,
    tableName: 'contacts'
  }
);

Contact.belongsTo(User, { foreignKey: 'contactOwnerId', as: 'contactOwner' });
