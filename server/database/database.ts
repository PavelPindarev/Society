import pkg from 'pg'
import dotenv from 'dotenv';

const { Client } = pkg
dotenv.config();

const client = new Client({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
}); 
client.connect();

export default client