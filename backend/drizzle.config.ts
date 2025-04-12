import 'dotenv/config';
import {defineConfig} from 'drizzle-kit';

const DB_FILE_NAME = 'file:local.db'
export default defineConfig({
    out: './drizzle',
    schema: './src/database/drizzle/schema',
    dialect: 'sqlite',
    dbCredentials: {
        url: DB_FILE_NAME
    },
});