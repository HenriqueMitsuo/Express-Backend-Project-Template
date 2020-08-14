import { sequelize } from '../../utils/database';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

// Instance Methods
User.prototype.test = function () {
  return `Name: ${this.name}\nAge: ${this.age}\nEmail: ${this.email}`;
};

export default User;
