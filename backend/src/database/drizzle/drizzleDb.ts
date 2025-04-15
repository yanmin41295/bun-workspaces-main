import {drizzle} from 'drizzle-orm/libsql';
import {createClient} from '@libsql/client';
import ProgramEnv from "../../env.loader.js";
import {int, sqliteTable, text} from "drizzle-orm/sqlite-core";
import {SQLiteColumnBuilderBase} from "drizzle-orm/sqlite-core/columns/common";

const client = createClient({url: ProgramEnv.database.url});
export const db = drizzle({client});

type TableColumnEntityMap<T> = {
    [key in keyof T]: SQLiteColumnBuilderBase
}

export function useTableDefine<T extends object>(name: string, fields: TableColumnEntityMap<T>) {
    return sqliteTable(name, fields);
}


