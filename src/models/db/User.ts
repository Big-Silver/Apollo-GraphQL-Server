import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from './sequelize';

export class User extends Model {
  id: string;
  email: string;
  password: string;
  name: string;
  roles: string;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  checkPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      type: DataTypes.STRING
    },
    roles: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    tableName: 'users'
  }
);

const encryptPassword = (user: User) => {
  if (user.changed('password')) {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
  }
};

User.beforeCreate(encryptPassword);
User.beforeUpdate(encryptPassword);
