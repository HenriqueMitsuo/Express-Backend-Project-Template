import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.SERVER_PORT,
  secret: {
    jwt: process.env.JWT_SECRET,
    jwtExp: process.env.JWT_EXP,
  },
  database: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  },
};

export default config;
