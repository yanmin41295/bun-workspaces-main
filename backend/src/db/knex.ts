import knex from 'knex';
import {LOGGER} from "../server.js";

export const KnexClient = knex({
    client: 'sqlite3',
    connection: {
        filename: 'D:\\codespace\\bun-workspaces-main\\backend\\database\\db.sqlite',
        // options: {
        //     nativeBinding: "/path/to/better_sqlite3.node",
        // },
        debug: true,
    },
    asyncStackTraces: true,
    pool: {
        min: 0, max: 7,
        afterCreate: async (conn: any, done: any) => {
            LOGGER.info('afterCreate')
            done(null, conn)
        },
    },
    migrations: {
        tableName: 'migrations'
    },
    postProcessResponse: (result, queryContext) => {
        // TODO: add special case for raw results
        // (depends on dialect)
        return result
    }

})
