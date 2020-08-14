import Sequelize from 'sequelize';
import config from '../config/index';

const db = config.database.database;
const user = config.database.username;
const pass = config.database.password;
const host = config.database.host;

export const sequelize = new Sequelize(db, user, pass, {
  host: host,
  dialect: 'mysql',
  define: {
    // Disable `createdAt` and `updatedAt` fields on models.
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();

    console.log('Database Connection has been established successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
