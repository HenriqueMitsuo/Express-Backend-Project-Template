import { sequelize } from '../../utils/database';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});

// Hooks
User.addHook('beforeCreate', async function (user) {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Instance Methods
User.prototype.test = function () {
  return `Name: ${this.name}\nAge: ${this.age}\nEmail: ${this.email}\nPassword: ${this.password}`;
};

User.prototype.checkPass = function (password) {
  const hash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
};

export default User;
