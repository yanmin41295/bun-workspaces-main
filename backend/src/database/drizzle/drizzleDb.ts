import {drizzle} from 'drizzle-orm/libsql';
import {createClient} from '@libsql/client';
import ProgramEnv from "../../env.loader.js";

const client = createClient({url: ProgramEnv.database.url});
export const db = drizzle({client});
