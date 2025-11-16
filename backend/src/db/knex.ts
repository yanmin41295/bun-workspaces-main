import knex from 'knex';
import ProgramEnv from "../env.js";

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: `${ProgramEnv.database.url}`
    },
    useNullAsDefault: true,
});

// 创建文件表
const createFilesTable = async () => {
    const exists = await db.schema.hasTable('files');
    if (!exists) {
        await db.schema.createTable('files', (table) => {
            table.increments('id').primary();
            table.string('originFileName').notNullable();
            table.integer('size').notNullable();
            table.string('md5').notNullable();
            table.datetime('uploadTime').notNullable();
            table.enu('type', ['file', 'dir']).notNullable();
            table.string('tag').defaultTo('');
            table.string('description').defaultTo('');
            table.string('filepath').notNullable();
            table.string('filename').notNullable();
        });
        console.log('Files table created successfully');
    }
};

// 初始化数据库
createFilesTable().catch(err => {
    console.error('Error creating files table:', err);
});

export default db;