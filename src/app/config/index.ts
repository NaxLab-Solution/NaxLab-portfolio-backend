import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASS,
  secret_access_token: process.env.SECRET_ACCESS_TOKEN,
  store_id : process.env.STORE_ID,
  store_password : process.env.STORE_PASSWORD,
  tmpi:  process.env.TMPAPI
};
