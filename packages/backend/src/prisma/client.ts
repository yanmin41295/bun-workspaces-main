/**
 * Client
 */

import * as runtime from '@prisma/client/runtime/library'
import * as process from 'node:process'
import * as path from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))


export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>


/**
 * Model ConfigTable
 *
 */
export type ConfigTable = runtime.Types.Result.DefaultSelection<Prisma.$ConfigTablePayload>
/**
 * Model ConfigColumn
 *
 */
export type ConfigColumn = runtime.Types.Result.DefaultSelection<Prisma.$ConfigColumnPayload>
/**
 * Model User
 *
 */
export type User = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>


/**
 * Create the Client
 */
const config: runtime.GetPrismaClientConfig = {
    "generator": {
        "name": "client",
        "provider": {
            "fromEnvVar": null,
            "value": "prisma-client"
        },
        "output": {
            "value": "D:\\codespace\\bun-workspaces-main\\backend\\src\\prisma",
            "fromEnvVar": null
        },
        "config": {
            "generatedFileExtension": "ts",
            "importFileExtension": "ts",
            "moduleFormat": "esm",
            "runtime": "nodejs",
            "engineType": "library"
        },
        "binaryTargets": [
            {
                "fromEnvVar": null,
                "value": "windows",
                "native": true
            }
        ],
        "previewFeatures": [],
        "sourceFilePath": "D:\\codespace\\bun-workspaces-main\\backend\\prisma\\schema.prisma",
        "isCustomOutput": true
    },
    "relativePath": "../../prisma",
    "clientVersion": "6.6.0",
    "engineVersion": "f676762280b54cd07c770017ed3711ddde35f37a",
    "datasourceNames": [
        "db"
    ],
    "activeProvider": "sqlite",
    "postinstall": false,
    "inlineDatasources": {
        "db": {
            "url": {
                "fromEnvVar": null,
                "value": "file:../database/db.sqlite"
            }
        }
    },
    "inlineSchema": "datasource db {\n  provider = \"sqlite\"\n  url      = \"file:../database/db.sqlite\"\n}\n\ngenerator client {\n  provider               = \"prisma-client\"\n  output                 = \"../src/prisma\"\n  runtime                = \"nodejs\"\n  moduleFormat           = \"esm\"\n  generatedFileExtension = \"ts\"\n  importFileExtension    = \"ts\"\n}\n\ngenerator gen {\n  provider = \"prisma-client-js\"\n}\n\n/**\n * generator typescriptInterfaces {\n * provider = \"prisma-generator-typescript-interfaces\"\n * output   = \"../../common/src/prisma/interfaces.ts\"\n * }\n */\n\ngenerator classValidator {\n  provider = \"prisma-generator-class-validator\"\n  output   = \"../../common/src/prisma\"\n}\n\nmodel ConfigTable {\n  id          Int      @id @default(autoincrement())\n  name        String   @unique @map(\"table_name\")\n  title       String   @map(\"table_title\")\n  description String   @default(\"\")\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  @@map(\"t_config_table\")\n}\n\nmodel ConfigColumn {\n  id        Int     @id @default(autoincrement())\n  name      String  @map(\"column_name\")\n  title     String  @map(\"column_title\")\n  desc      String  @default(\"\")\n  tableId   Int     @map(\"table_id\")\n  dataType  String  @map(\"data_type\")\n  dataIndex String  @map(\"data_index\")\n  isShow    Boolean @default(true) // 1: 显示 2: 隐藏\n  isEdit    Boolean @default(true) // 1: 编辑 2: 只读\n  order     Int     @default(0)\n\n  @@map(\"t_config_column\")\n}\n\nmodel User {\n  id       Int     @id @default(autoincrement())\n  username String\n  email    String? @unique\n\n  @@map(\"t_user\")\n}\n",
    "inlineSchemaHash": "6ad3d365a8c7e24aaf6b41f6701601e22296e534254a62384d59d04c662d5037",
    "copyEngine": true,
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "dirname": ""
}
config.dirname = __dirname

config.runtimeDataModel = JSON.parse("{\"models\":{\"ConfigTable\":{\"dbName\":\"t_config_table\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"dbName\":\"table_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"dbName\":\"table_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ConfigColumn\":{\"dbName\":\"t_config_column\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"dbName\":\"column_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"dbName\":\"column_title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"desc\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tableId\",\"dbName\":\"table_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dataType\",\"dbName\":\"data_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dataIndex\",\"dbName\":\"data_index\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isShow\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isEdit\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"User\":{\"dbName\":\"t_user\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{},\"types\":{}}")
config.engineWasm = undefined
config.compilerWasm = undefined


// file annotations for bundling tools to include these files
path.join(__dirname, "query_engine-windows.dll.node")
path.join(process.cwd(), "src/prisma/query_engine-windows.dll.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma")
path.join(process.cwd(), "src/prisma/schema.prisma")


interface PrismaClientConstructor {
    /**
     * ## Prisma Client
     *
     * Type-safe database client for TypeScript
     * @example
     * ```
     * const prisma = new PrismaClient()
     * // Fetch zero or more ConfigTables
     * const configTables = await prisma.configTable.findMany()
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
     */
    new<
        ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
        U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
        ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
    >(options?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>): PrismaClient<ClientOptions, U, ExtArgs>
}

/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ConfigTables
 * const configTables = await prisma.configTable.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export interface PrismaClient<
    ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
    U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
    ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs
> {
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
        extArgs: ExtArgs
    }>>

    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;

    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;

    /**
     * Add a middleware
     * @deprecated since 4.16.0. For new code, prefer client extensions instead.
     * @see https://pris.ly/d/extensions
     */
    $use(cb: Prisma.Middleware): void

    /**
     * Executes a prepared raw query and returns the number of affected rows.
     * @example
     * ```
     * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number,
        timeout?: number,
        isolationLevel?: Prisma.TransactionIsolationLevel
    }): runtime.Types.Utils.JsPromise<R>

    /**
     * `prisma.configTable`: Exposes CRUD operations for the **ConfigTable** model.
     * Example usage:
     * ```ts
     * // Fetch zero or more ConfigTables
     * const configTables = await prisma.configTable.findMany()
     * ```
     */
    get configTable(): Prisma.ConfigTableDelegate<ExtArgs, ClientOptions>;

    /**
     * `prisma.configColumn`: Exposes CRUD operations for the **ConfigColumn** model.
     * Example usage:
     * ```ts
     * // Fetch zero or more ConfigColumns
     * const configColumns = await prisma.configColumn.findMany()
     * ```
     */
    get configColumn(): Prisma.ConfigColumnDelegate<ExtArgs, ClientOptions>;

    /**
     * `prisma.user`: Exposes CRUD operations for the **User** model.
     * Example usage:
     * ```ts
     * // Fetch zero or more Users
     * const users = await prisma.user.findMany()
     * ```
     */
    get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
}

export const PrismaClient = runtime.getPrismaClient(config) as unknown as PrismaClientConstructor

export namespace Prisma {
    export type DMMF = typeof runtime.DMMF

    export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

    /**
     * Validator
     */
    export const validator = runtime.Public.validator

    /**
     * Prisma Errors
     */

    export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
    export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError

    export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
    export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError

    export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
    export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError

    export const PrismaClientInitializationError = runtime.PrismaClientInitializationError
    export type PrismaClientInitializationError = runtime.PrismaClientInitializationError

    export const PrismaClientValidationError = runtime.PrismaClientValidationError
    export type PrismaClientValidationError = runtime.PrismaClientValidationError

    /**
     * Re-export of sql-template-tag
     */
    export const sql = runtime.sqltag
    export const empty = runtime.empty
    export const join = runtime.join
    export const raw = runtime.raw
    export const Sql = runtime.Sql
    export type Sql = runtime.Sql


    /**
     * Decimal.js
     */
    export const Decimal = runtime.Decimal
    export type Decimal = runtime.Decimal

    export type DecimalJsLike = runtime.DecimalJsLike

    /**
     * Metrics
     */
    export type Metrics = runtime.Metrics
    export type Metric<T> = runtime.Metric<T>
    export type MetricHistogram = runtime.MetricHistogram
    export type MetricHistogramBucket = runtime.MetricHistogramBucket

    /**
     * Extensions
     */
    export type Extension = runtime.Types.Extensions.UserArgs
    export const getExtensionContext = runtime.Extensions.getExtensionContext
    export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>
    export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>
    export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>
    export type Exact<A, W> = runtime.Types.Public.Exact<A, W>

    export type PrismaVersion = {
        client: string
        engine: string
    }

    /**
     * Prisma Client JS version: 6.6.0
     * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
     */
    export const prismaVersion: PrismaVersion = {
        client: "6.6.0",
        engine: "f676762280b54cd07c770017ed3711ddde35f37a"
    }

    /**
     * Utility Types
     */


    export type JsonObject = runtime.JsonObject
    export type JsonArray = runtime.JsonArray
    export type JsonValue = runtime.JsonValue
    export type InputJsonObject = runtime.InputJsonObject
    export type InputJsonArray = runtime.InputJsonArray
    export type InputJsonValue = runtime.InputJsonValue

    export const NullTypes = {
        DbNull: runtime.objectEnumValues.classes.DbNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull),
        JsonNull: runtime.objectEnumValues.classes.JsonNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull),
        AnyNull: runtime.objectEnumValues.classes.AnyNull as (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull),
    }

    /**
     * Helper for filtering JSON entries that have `null` on the database (empty on the db)
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    export const DbNull = runtime.objectEnumValues.instances.DbNull

    /**
     * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    export const JsonNull = runtime.objectEnumValues.instances.JsonNull

    /**
     * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    export const AnyNull = runtime.objectEnumValues.instances.AnyNull

    type SelectAndInclude = {
        select: any
        include: any
    }

    type SelectAndOmit = {
        select: any
        omit: any
    }

    /**
     * From T, pick a set of properties whose keys are in the union K
     */
    type Prisma__Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    };

    export type Enumerable<T> = T | Array<T>;

    /**
     * Subset
     * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
     */
    export type Subset<T, U> = {
        [key in keyof T]: key extends keyof U ? T[key] : never;
    };

    /**
     * SelectSubset
     * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
     * Additionally, it validates, if both select and include are present. If the case, it errors.
     */
    export type SelectSubset<T, U> = {
        [key in keyof T]: key extends keyof U ? T[key] : never
    } &
        (T extends SelectAndInclude
            ? 'Please either choose `select` or `include`.'
            : T extends SelectAndOmit
                ? 'Please either choose `select` or `omit`.'
                : {})

    /**
     * Subset + Intersection
     * @desc From `T` pick properties that exist in `U` and intersect `K`
     */
    export type SubsetIntersection<T, U, K> = {
        [key in keyof T]: key extends keyof U ? T[key] : never
    } &
        K

    type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

    /**
     * XOR is needed to have a real mutually exclusive union type
     * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
     */
    type XOR<T, U> =
        T extends object ?
            U extends object ?
                (Without<T, U> & U) | (Without<U, T> & T)
                : U : T


    /**
     * Is T a Record?
     */
    type IsObject<T extends any> = T extends Array<any>
        ? False
        : T extends Date
            ? False
            : T extends Uint8Array
                ? False
                : T extends BigInt
                    ? False
                    : T extends object
                        ? True
                        : False


    /**
     * If it's T[], return T
     */
    export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

    /**
     * From ts-toolbelt
     */

    type __Either<O extends object, K extends Key> = Omit<O, K> &
        {
            // Merge all but K
            [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
        }[K]

    type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

    type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

    type _Either<
        O extends object,
        K extends Key,
        strict extends Boolean
    > = {
        1: EitherStrict<O, K>
        0: EitherLoose<O, K>
    }[strict]

    type Either<
        O extends object,
        K extends Key,
        strict extends Boolean = 1
    > = O extends unknown ? _Either<O, K, strict> : never

    export type Union = any

    type PatchUndefined<O extends object, O1 extends object> = {
        [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
    } & {}

    /** Helper Types for "Merge" **/
    export type IntersectOf<U extends Union> = (
        U extends unknown ? (k: U) => void : never
        ) extends (k: infer I) => void
        ? I
        : never

    export type Overwrite<O extends object, O1 extends object> = {
        [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
    } & {};

    type _Merge<U extends object> = IntersectOf<Overwrite<U, {
        [K in keyof U]-?: At<U, K>;
    }>>;

    type Key = string | number | symbol;
    type AtStrict<O extends object, K extends Key> = O[K & keyof O];
    type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
    export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
        1: AtStrict<O, K>;
        0: AtLoose<O, K>;
    }[strict];

    export type ComputeRaw<A extends any> = A extends Function ? A : {
        [K in keyof A]: A[K];
    } & {};

    export type OptionalFlat<O> = {
        [K in keyof O]?: O[K];
    } & {};

    type _Record<K extends keyof any, T> = {
        [P in K]: T;
    };

    // cause typescript not to expand types and preserve names
    type NoExpand<T> = T extends unknown ? T : never;

    // this type assumes the passed object is entirely optional
    export type AtLeast<O extends object, K extends string> = NoExpand<
        O extends unknown
            ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
            | { [P in keyof O as P extends K ? P : never]-?: O[P] } & O
            : never>;

    type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

    export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
    /** End Helper Types for "Merge" **/

    export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

    export type Boolean = True | False

    export type True = 1

    export type False = 0

    export type Not<B extends Boolean> = {
        0: 1
        1: 0
    }[B]

    export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
        ? 0 // anything `never` is false
        : A1 extends A2
            ? 1
            : 0

    export type Has<U extends Union, U1 extends Union> = Not<
        Extends<Exclude<U1, U>, U1>
    >

    export type Or<B1 extends Boolean, B2 extends Boolean> = {
        0: {
            0: 0
            1: 1
        }
        1: {
            0: 1
            1: 1
        }
    }[B1][B2]

    export type Keys<U extends Union> = U extends unknown ? keyof U : never

    export type GetScalarType<T, O> = O extends object ? {
        [P in keyof T]: P extends keyof O
            ? O[P]
            : never
    } : never

    type FieldPaths<
        T,
        U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
    > = IsObject<T> extends True ? U : T

    type GetHavingFields<T> = {
        [K in keyof T]: Or<
            Or<Extends<'OR', K>, Extends<'AND', K>>,
            Extends<'NOT', K>
        > extends True
            ? // infer is only needed to not hit TS limit
            // based on the brilliant idea of Pierre-Antoine Mills
            // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
            T[K] extends infer TK
                ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
                : never
            : {} extends FieldPaths<T[K]>
                ? never
                : K
    }[keyof T]

    /**
     * Convert tuple to union
     */
    type _TupleToUnion<T> = T extends (infer E)[] ? E : never
    type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
    type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

    /**
     * Like `Pick`, but additionally can also accept an array of keys
     */
    type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

    /**
     * Exclude all keys with underscores
     */
    type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


    export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

    type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


    export const ModelName = {
        ConfigTable: 'ConfigTable',
        ConfigColumn: 'ConfigColumn',
        User: 'User'
    } as const

    export type ModelName = (typeof ModelName)[keyof typeof ModelName]


    export type Datasources = {
        db?: Datasource
    }

    export interface TypeMapCb<ClientOptions = {}> extends runtime.Types.Utils.Fn<{
        extArgs: runtime.Types.Extensions.InternalArgs
    }, runtime.Types.Utils.Record<string, any>> {
        returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends {
            omit: infer OmitOptions
        } ? OmitOptions : {}>
    }

    export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> =
        {
            globalOmitOptions: {
                omit: GlobalOmitOptions
            }
            meta: {
                modelProps: "configTable" | "configColumn" | "user"
                txIsolationLevel: Prisma.TransactionIsolationLevel
            }
            model: {
                ConfigTable: {
                    payload: Prisma.$ConfigTablePayload<ExtArgs>
                    fields: Prisma.ConfigTableFieldRefs
                    operations: {
                        findUnique: {
                            args: Prisma.ConfigTableFindUniqueArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigTablePayload> | null
                        }
                        findUniqueOrThrow: {
                            args: Prisma.ConfigTableFindUniqueOrThrowArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigTablePayload>
                        }
                        findFirst: {
                            args: Prisma.ConfigTableFindFirstArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigTablePayload> | null
                        }
                        findFirstOrThrow: {
                            args: Prisma.ConfigTableFindFirstOrThrowArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigTablePayload>
                        }
                        findMany: {
                            args: Prisma.ConfigTableFindManyArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigTablePayload>[]
                        }
                        create: {
                            args: Prisma.ConfigTableCreateArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigTablePayload>
                        }
                        createMany: {
                            args: Prisma.ConfigTableCreateManyArgs<ExtArgs>
                            result: BatchPayload
                        }
                        createManyAndReturn: {
                            args: Prisma.ConfigTableCreateManyAndReturnArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigTablePayload>[]
                        }
                        delete: {
                            args: Prisma.ConfigTableDeleteArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigTablePayload>
                        }
                        update: {
                            args: Prisma.ConfigTableUpdateArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigTablePayload>
                        }
                        deleteMany: {
                            args: Prisma.ConfigTableDeleteManyArgs<ExtArgs>
                            result: BatchPayload
                        }
                        updateMany: {
                            args: Prisma.ConfigTableUpdateManyArgs<ExtArgs>
                            result: BatchPayload
                        }
                        updateManyAndReturn: {
                            args: Prisma.ConfigTableUpdateManyAndReturnArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigTablePayload>[]
                        }
                        upsert: {
                            args: Prisma.ConfigTableUpsertArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigTablePayload>
                        }
                        aggregate: {
                            args: Prisma.ConfigTableAggregateArgs<ExtArgs>
                            result: runtime.Types.Utils.Optional<AggregateConfigTable>
                        }
                        groupBy: {
                            args: Prisma.ConfigTableGroupByArgs<ExtArgs>
                            result: runtime.Types.Utils.Optional<ConfigTableGroupByOutputType>[]
                        }
                        count: {
                            args: Prisma.ConfigTableCountArgs<ExtArgs>
                            result: runtime.Types.Utils.Optional<ConfigTableCountAggregateOutputType> | number
                        }
                    }
                }
                ConfigColumn: {
                    payload: Prisma.$ConfigColumnPayload<ExtArgs>
                    fields: Prisma.ConfigColumnFieldRefs
                    operations: {
                        findUnique: {
                            args: Prisma.ConfigColumnFindUniqueArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigColumnPayload> | null
                        }
                        findUniqueOrThrow: {
                            args: Prisma.ConfigColumnFindUniqueOrThrowArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigColumnPayload>
                        }
                        findFirst: {
                            args: Prisma.ConfigColumnFindFirstArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigColumnPayload> | null
                        }
                        findFirstOrThrow: {
                            args: Prisma.ConfigColumnFindFirstOrThrowArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigColumnPayload>
                        }
                        findMany: {
                            args: Prisma.ConfigColumnFindManyArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigColumnPayload>[]
                        }
                        create: {
                            args: Prisma.ConfigColumnCreateArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigColumnPayload>
                        }
                        createMany: {
                            args: Prisma.ConfigColumnCreateManyArgs<ExtArgs>
                            result: BatchPayload
                        }
                        createManyAndReturn: {
                            args: Prisma.ConfigColumnCreateManyAndReturnArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigColumnPayload>[]
                        }
                        delete: {
                            args: Prisma.ConfigColumnDeleteArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigColumnPayload>
                        }
                        update: {
                            args: Prisma.ConfigColumnUpdateArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigColumnPayload>
                        }
                        deleteMany: {
                            args: Prisma.ConfigColumnDeleteManyArgs<ExtArgs>
                            result: BatchPayload
                        }
                        updateMany: {
                            args: Prisma.ConfigColumnUpdateManyArgs<ExtArgs>
                            result: BatchPayload
                        }
                        updateManyAndReturn: {
                            args: Prisma.ConfigColumnUpdateManyAndReturnArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigColumnPayload>[]
                        }
                        upsert: {
                            args: Prisma.ConfigColumnUpsertArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$ConfigColumnPayload>
                        }
                        aggregate: {
                            args: Prisma.ConfigColumnAggregateArgs<ExtArgs>
                            result: runtime.Types.Utils.Optional<AggregateConfigColumn>
                        }
                        groupBy: {
                            args: Prisma.ConfigColumnGroupByArgs<ExtArgs>
                            result: runtime.Types.Utils.Optional<ConfigColumnGroupByOutputType>[]
                        }
                        count: {
                            args: Prisma.ConfigColumnCountArgs<ExtArgs>
                            result: runtime.Types.Utils.Optional<ConfigColumnCountAggregateOutputType> | number
                        }
                    }
                }
                User: {
                    payload: Prisma.$UserPayload<ExtArgs>
                    fields: Prisma.UserFieldRefs
                    operations: {
                        findUnique: {
                            args: Prisma.UserFindUniqueArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null
                        }
                        findUniqueOrThrow: {
                            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
                        }
                        findFirst: {
                            args: Prisma.UserFindFirstArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null
                        }
                        findFirstOrThrow: {
                            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
                        }
                        findMany: {
                            args: Prisma.UserFindManyArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[]
                        }
                        create: {
                            args: Prisma.UserCreateArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
                        }
                        createMany: {
                            args: Prisma.UserCreateManyArgs<ExtArgs>
                            result: BatchPayload
                        }
                        createManyAndReturn: {
                            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[]
                        }
                        delete: {
                            args: Prisma.UserDeleteArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
                        }
                        update: {
                            args: Prisma.UserUpdateArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
                        }
                        deleteMany: {
                            args: Prisma.UserDeleteManyArgs<ExtArgs>
                            result: BatchPayload
                        }
                        updateMany: {
                            args: Prisma.UserUpdateManyArgs<ExtArgs>
                            result: BatchPayload
                        }
                        updateManyAndReturn: {
                            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[]
                        }
                        upsert: {
                            args: Prisma.UserUpsertArgs<ExtArgs>
                            result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>
                        }
                        aggregate: {
                            args: Prisma.UserAggregateArgs<ExtArgs>
                            result: runtime.Types.Utils.Optional<AggregateUser>
                        }
                        groupBy: {
                            args: Prisma.UserGroupByArgs<ExtArgs>
                            result: runtime.Types.Utils.Optional<UserGroupByOutputType>[]
                        }
                        count: {
                            args: Prisma.UserCountArgs<ExtArgs>
                            result: runtime.Types.Utils.Optional<UserCountAggregateOutputType> | number
                        }
                    }
                }
            }
        }
        & {
        other: {
            payload: any
            operations: {
                $executeRaw: {
                    args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
                    result: any
                }
                $executeRawUnsafe: {
                    args: [query: string, ...values: any[]],
                    result: any
                }
                $queryRaw: {
                    args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
                    result: any
                }
                $queryRawUnsafe: {
                    args: [query: string, ...values: any[]],
                    result: any
                }
            }
        }
    }
    export const defineExtension = runtime.Extensions.defineExtension as unknown as runtime.Types.Extensions.ExtendsHook<"define", Prisma.TypeMapCb, runtime.Types.Extensions.DefaultArgs>
    export type DefaultPrismaClient = PrismaClient
    export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

    export interface PrismaClientOptions {
        /**
         * Overwrites the datasource url from your schema.prisma file
         */
        datasources?: Datasources
        /**
         * Overwrites the datasource url from your schema.prisma file
         */
        datasourceUrl?: string
        /**
         * @default "colorless"
         */
        errorFormat?: ErrorFormat
        /**
         * @example
         * ```
         * // Defaults to stdout
         * log: ['query', 'info', 'warn', 'error']
         *
         * // Emit as events
         * log: [
         *   { emit: 'stdout', level: 'query' },
         *   { emit: 'stdout', level: 'info' },
         *   { emit: 'stdout', level: 'warn' }
         *   { emit: 'stdout', level: 'error' }
         * ]
         * ```
         * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
         */
        log?: (LogLevel | LogDefinition)[]
        /**
         * The default values for transactionOptions
         * maxWait ?= 2000
         * timeout ?= 5000
         */
        transactionOptions?: {
            maxWait?: number
            timeout?: number
            isolationLevel?: Prisma.TransactionIsolationLevel
        }
        /**
         * Global configuration for omitting model fields by default.
         *
         * @example
         * ```
         * const prisma = new PrismaClient({
         *   omit: {
         *     user: {
         *       password: true
         *     }
         *   }
         * })
         * ```
         */
        omit?: Prisma.GlobalOmitConfig
    }

    export type GlobalOmitConfig = {
        configTable?: ConfigTableOmit
        configColumn?: ConfigColumnOmit
        user?: UserOmit
    }

    /* Types for Logging */
    export type LogLevel = 'info' | 'query' | 'warn' | 'error'
    export type LogDefinition = {
        level: LogLevel
        emit: 'stdout' | 'event'
    }

    export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
    export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
        GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
        : never

    export type QueryEvent = {
        timestamp: Date
        query: string
        params: string
        duration: number
        target: string
    }

    export type LogEvent = {
        timestamp: Date
        message: string
        target: string
    }
    /* End Types for Logging */


    export type PrismaAction =
        | 'findUnique'
        | 'findUniqueOrThrow'
        | 'findMany'
        | 'findFirst'
        | 'findFirstOrThrow'
        | 'create'
        | 'createMany'
        | 'createManyAndReturn'
        | 'update'
        | 'updateMany'
        | 'updateManyAndReturn'
        | 'upsert'
        | 'delete'
        | 'deleteMany'
        | 'executeRaw'
        | 'queryRaw'
        | 'aggregate'
        | 'count'
        | 'runCommandRaw'
        | 'findRaw'
        | 'groupBy'

    /**
     * These options are being passed into the middleware as "params"
     */
    export type MiddlewareParams = {
        model?: ModelName
        action: PrismaAction
        args: any
        dataPath: string[]
        runInTransaction: boolean
    }

    /**
     * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
     */
    export type Middleware<T = any> = (
        params: MiddlewareParams,
        next: (params: MiddlewareParams) => runtime.Types.Utils.JsPromise<T>,
    ) => runtime.Types.Utils.JsPromise<T>

    /**
     * `PrismaClient` proxy available in interactive transactions.
     */
    export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

    export type Datasource = {
        url?: string
    }

    /**
     * Count Types
     */


    /**
     * Models
     */

    /**
     * Model ConfigTable
     */

    export type AggregateConfigTable = {
        _count: ConfigTableCountAggregateOutputType | null
        _avg: ConfigTableAvgAggregateOutputType | null
        _sum: ConfigTableSumAggregateOutputType | null
        _min: ConfigTableMinAggregateOutputType | null
        _max: ConfigTableMaxAggregateOutputType | null
    }

    export type ConfigTableAvgAggregateOutputType = {
        id: number | null
    }

    export type ConfigTableSumAggregateOutputType = {
        id: number | null
    }

    export type ConfigTableMinAggregateOutputType = {
        id: number | null
        name: string | null
        title: string | null
        description: string | null
        createdAt: Date | null
        updatedAt: Date | null
    }

    export type ConfigTableMaxAggregateOutputType = {
        id: number | null
        name: string | null
        title: string | null
        description: string | null
        createdAt: Date | null
        updatedAt: Date | null
    }

    export type ConfigTableCountAggregateOutputType = {
        id: number
        name: number
        title: number
        description: number
        createdAt: number
        updatedAt: number
        _all: number
    }


    export type ConfigTableAvgAggregateInputType = {
        id?: true
    }

    export type ConfigTableSumAggregateInputType = {
        id?: true
    }

    export type ConfigTableMinAggregateInputType = {
        id?: true
        name?: true
        title?: true
        description?: true
        createdAt?: true
        updatedAt?: true
    }

    export type ConfigTableMaxAggregateInputType = {
        id?: true
        name?: true
        title?: true
        description?: true
        createdAt?: true
        updatedAt?: true
    }

    export type ConfigTableCountAggregateInputType = {
        id?: true
        name?: true
        title?: true
        description?: true
        createdAt?: true
        updatedAt?: true
        _all?: true
    }

    export type ConfigTableAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Filter which ConfigTable to aggregate.
         */
        where?: ConfigTableWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of ConfigTables to fetch.
         */
        orderBy?: ConfigTableOrderByWithRelationInput | ConfigTableOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the start position
         */
        cursor?: ConfigTableWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` ConfigTables from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` ConfigTables.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Count returned ConfigTables
         **/
        _count?: true | ConfigTableCountAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to average
         **/
        _avg?: ConfigTableAvgAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to sum
         **/
        _sum?: ConfigTableSumAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the minimum value
         **/
        _min?: ConfigTableMinAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the maximum value
         **/
        _max?: ConfigTableMaxAggregateInputType
    }

    export type GetConfigTableAggregateType<T extends ConfigTableAggregateArgs> = {
        [P in keyof T & keyof AggregateConfigTable]: P extends '_count' | 'count'
            ? T[P] extends true
                ? number
                : GetScalarType<T[P], AggregateConfigTable[P]>
            : GetScalarType<T[P], AggregateConfigTable[P]>
    }


    export type ConfigTableGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        where?: ConfigTableWhereInput
        orderBy?: ConfigTableOrderByWithAggregationInput | ConfigTableOrderByWithAggregationInput[]
        by: ConfigTableScalarFieldEnum[] | ConfigTableScalarFieldEnum
        having?: ConfigTableScalarWhereWithAggregatesInput
        take?: number
        skip?: number
        _count?: ConfigTableCountAggregateInputType | true
        _avg?: ConfigTableAvgAggregateInputType
        _sum?: ConfigTableSumAggregateInputType
        _min?: ConfigTableMinAggregateInputType
        _max?: ConfigTableMaxAggregateInputType
    }

    export type ConfigTableGroupByOutputType = {
        id: number
        name: string
        title: string
        description: string
        createdAt: Date
        updatedAt: Date
        _count: ConfigTableCountAggregateOutputType | null
        _avg: ConfigTableAvgAggregateOutputType | null
        _sum: ConfigTableSumAggregateOutputType | null
        _min: ConfigTableMinAggregateOutputType | null
        _max: ConfigTableMaxAggregateOutputType | null
    }

    type GetConfigTableGroupByPayload<T extends ConfigTableGroupByArgs> = Prisma.PrismaPromise<
        Array<
            PickEnumerable<ConfigTableGroupByOutputType, T['by']> &
            {
                [P in ((keyof T) & (keyof ConfigTableGroupByOutputType))]: P extends '_count'
                ? T[P] extends boolean
                    ? number
                    : GetScalarType<T[P], ConfigTableGroupByOutputType[P]>
                : GetScalarType<T[P], ConfigTableGroupByOutputType[P]>
            }
        >
    >


    export type ConfigTableSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
        id?: boolean
        name?: boolean
        title?: boolean
        description?: boolean
        createdAt?: boolean
        updatedAt?: boolean
    }, ExtArgs["result"]["configTable"]>

    export type ConfigTableSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
        id?: boolean
        name?: boolean
        title?: boolean
        description?: boolean
        createdAt?: boolean
        updatedAt?: boolean
    }, ExtArgs["result"]["configTable"]>

    export type ConfigTableSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
        id?: boolean
        name?: boolean
        title?: boolean
        description?: boolean
        createdAt?: boolean
        updatedAt?: boolean
    }, ExtArgs["result"]["configTable"]>

    export type ConfigTableSelectScalar = {
        id?: boolean
        name?: boolean
        title?: boolean
        description?: boolean
        createdAt?: boolean
        updatedAt?: boolean
    }

    export type ConfigTableOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "title" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["configTable"]>

    export type $ConfigTablePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        name: "ConfigTable"
        objects: {}
        scalars: runtime.Types.Extensions.GetPayloadResult<{
            id: number
            name: string
            title: string
            description: string
            createdAt: Date
            updatedAt: Date
        }, ExtArgs["result"]["configTable"]>
        composites: {}
    }

    export type ConfigTableGetPayload<S extends boolean | null | undefined | ConfigTableDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConfigTablePayload, S>

    export type ConfigTableCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
        Omit<ConfigTableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: ConfigTableCountAggregateInputType | true
    }

    export interface ConfigTableDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        /**
         * Fields of the ConfigTable model
         */
        readonly fields: ConfigTableFieldRefs;

        [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConfigTable'], meta: { name: 'ConfigTable' } }

        /**
         * Find zero or one ConfigTable that matches the filter.
         * @param {ConfigTableFindUniqueArgs} args - Arguments to find a ConfigTable
         * @example
         * // Get one ConfigTable
         * const configTable = await prisma.configTable.findUnique({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUnique<T extends ConfigTableFindUniqueArgs>(args: SelectSubset<T, ConfigTableFindUniqueArgs<ExtArgs>>): Prisma__ConfigTableClient<runtime.Types.Result.GetResult<Prisma.$ConfigTablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

        /**
         * Find one ConfigTable that matches the filter or throw an error with `error.code='P2025'`
         * if no matches were found.
         * @param {ConfigTableFindUniqueOrThrowArgs} args - Arguments to find a ConfigTable
         * @example
         * // Get one ConfigTable
         * const configTable = await prisma.configTable.findUniqueOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUniqueOrThrow<T extends ConfigTableFindUniqueOrThrowArgs>(args: SelectSubset<T, ConfigTableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConfigTableClient<runtime.Types.Result.GetResult<Prisma.$ConfigTablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Find the first ConfigTable that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConfigTableFindFirstArgs} args - Arguments to find a ConfigTable
         * @example
         * // Get one ConfigTable
         * const configTable = await prisma.configTable.findFirst({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirst<T extends ConfigTableFindFirstArgs>(args?: SelectSubset<T, ConfigTableFindFirstArgs<ExtArgs>>): Prisma__ConfigTableClient<runtime.Types.Result.GetResult<Prisma.$ConfigTablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

        /**
         * Find the first ConfigTable that matches the filter or
         * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConfigTableFindFirstOrThrowArgs} args - Arguments to find a ConfigTable
         * @example
         * // Get one ConfigTable
         * const configTable = await prisma.configTable.findFirstOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirstOrThrow<T extends ConfigTableFindFirstOrThrowArgs>(args?: SelectSubset<T, ConfigTableFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConfigTableClient<runtime.Types.Result.GetResult<Prisma.$ConfigTablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Find zero or more ConfigTables that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConfigTableFindManyArgs} args - Arguments to filter and select certain fields only.
         * @example
         * // Get all ConfigTables
         * const configTables = await prisma.configTable.findMany()
         *
         * // Get first 10 ConfigTables
         * const configTables = await prisma.configTable.findMany({ take: 10 })
         *
         * // Only select the `id`
         * const configTableWithIdOnly = await prisma.configTable.findMany({ select: { id: true } })
         *
         */
        findMany<T extends ConfigTableFindManyArgs>(args?: SelectSubset<T, ConfigTableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfigTablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

        /**
         * Create a ConfigTable.
         * @param {ConfigTableCreateArgs} args - Arguments to create a ConfigTable.
         * @example
         * // Create one ConfigTable
         * const ConfigTable = await prisma.configTable.create({
         *   data: {
         *     // ... data to create a ConfigTable
         *   }
         * })
         *
         */
        create<T extends ConfigTableCreateArgs>(args: SelectSubset<T, ConfigTableCreateArgs<ExtArgs>>): Prisma__ConfigTableClient<runtime.Types.Result.GetResult<Prisma.$ConfigTablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Create many ConfigTables.
         * @param {ConfigTableCreateManyArgs} args - Arguments to create many ConfigTables.
         * @example
         * // Create many ConfigTables
         * const configTable = await prisma.configTable.createMany({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         */
        createMany<T extends ConfigTableCreateManyArgs>(args?: SelectSubset<T, ConfigTableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

        /**
         * Create many ConfigTables and returns the data saved in the database.
         * @param {ConfigTableCreateManyAndReturnArgs} args - Arguments to create many ConfigTables.
         * @example
         * // Create many ConfigTables
         * const configTable = await prisma.configTable.createManyAndReturn({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Create many ConfigTables and only return the `id`
         * const configTableWithIdOnly = await prisma.configTable.createManyAndReturn({
         *   select: { id: true },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        createManyAndReturn<T extends ConfigTableCreateManyAndReturnArgs>(args?: SelectSubset<T, ConfigTableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfigTablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

        /**
         * Delete a ConfigTable.
         * @param {ConfigTableDeleteArgs} args - Arguments to delete one ConfigTable.
         * @example
         * // Delete one ConfigTable
         * const ConfigTable = await prisma.configTable.delete({
         *   where: {
         *     // ... filter to delete one ConfigTable
         *   }
         * })
         *
         */
        delete<T extends ConfigTableDeleteArgs>(args: SelectSubset<T, ConfigTableDeleteArgs<ExtArgs>>): Prisma__ConfigTableClient<runtime.Types.Result.GetResult<Prisma.$ConfigTablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Update one ConfigTable.
         * @param {ConfigTableUpdateArgs} args - Arguments to update one ConfigTable.
         * @example
         * // Update one ConfigTable
         * const configTable = await prisma.configTable.update({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        update<T extends ConfigTableUpdateArgs>(args: SelectSubset<T, ConfigTableUpdateArgs<ExtArgs>>): Prisma__ConfigTableClient<runtime.Types.Result.GetResult<Prisma.$ConfigTablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Delete zero or more ConfigTables.
         * @param {ConfigTableDeleteManyArgs} args - Arguments to filter ConfigTables to delete.
         * @example
         * // Delete a few ConfigTables
         * const { count } = await prisma.configTable.deleteMany({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         *
         */
        deleteMany<T extends ConfigTableDeleteManyArgs>(args?: SelectSubset<T, ConfigTableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

        /**
         * Update zero or more ConfigTables.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConfigTableUpdateManyArgs} args - Arguments to update one or more rows.
         * @example
         * // Update many ConfigTables
         * const configTable = await prisma.configTable.updateMany({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        updateMany<T extends ConfigTableUpdateManyArgs>(args: SelectSubset<T, ConfigTableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

        /**
         * Update zero or more ConfigTables and returns the data updated in the database.
         * @param {ConfigTableUpdateManyAndReturnArgs} args - Arguments to update many ConfigTables.
         * @example
         * // Update many ConfigTables
         * const configTable = await prisma.configTable.updateManyAndReturn({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Update zero or more ConfigTables and only return the `id`
         * const configTableWithIdOnly = await prisma.configTable.updateManyAndReturn({
         *   select: { id: true },
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        updateManyAndReturn<T extends ConfigTableUpdateManyAndReturnArgs>(args: SelectSubset<T, ConfigTableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfigTablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

        /**
         * Create or update one ConfigTable.
         * @param {ConfigTableUpsertArgs} args - Arguments to update or create a ConfigTable.
         * @example
         * // Update or create a ConfigTable
         * const configTable = await prisma.configTable.upsert({
         *   create: {
         *     // ... data to create a ConfigTable
         *   },
         *   update: {
         *     // ... in case it already exists, update
         *   },
         *   where: {
         *     // ... the filter for the ConfigTable we want to update
         *   }
         * })
         */
        upsert<T extends ConfigTableUpsertArgs>(args: SelectSubset<T, ConfigTableUpsertArgs<ExtArgs>>): Prisma__ConfigTableClient<runtime.Types.Result.GetResult<Prisma.$ConfigTablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Count the number of ConfigTables.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConfigTableCountArgs} args - Arguments to filter ConfigTables to count.
         * @example
         * // Count the number of ConfigTables
         * const count = await prisma.configTable.count({
         *   where: {
         *     // ... the filter for the ConfigTables we want to count
         *   }
         * })
         **/
        count<T extends ConfigTableCountArgs>(
            args?: Subset<T, ConfigTableCountArgs>,
        ): Prisma.PrismaPromise<
            T extends runtime.Types.Utils.Record<'select', any>
                ? T['select'] extends true
                    ? number
                    : GetScalarType<T['select'], ConfigTableCountAggregateOutputType>
                : number
        >

        /**
         * Allows you to perform aggregations operations on a ConfigTable.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConfigTableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
         * @example
         * // Ordered by age ascending
         * // Where email contains prisma.io
         * // Limited to the 10 users
         * const aggregations = await prisma.user.aggregate({
         *   _avg: {
         *     age: true,
         *   },
         *   where: {
         *     email: {
         *       contains: "prisma.io",
         *     },
         *   },
         *   orderBy: {
         *     age: "asc",
         *   },
         *   take: 10,
         * })
         **/
        aggregate<T extends ConfigTableAggregateArgs>(args: Subset<T, ConfigTableAggregateArgs>): Prisma.PrismaPromise<GetConfigTableAggregateType<T>>

        /**
         * Group by ConfigTable.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConfigTableGroupByArgs} args - Group by arguments.
         * @example
         * // Group by city, order by createdAt, get count
         * const result = await prisma.user.groupBy({
         *   by: ['city', 'createdAt'],
         *   orderBy: {
         *     createdAt: true
         *   },
         *   _count: {
         *     _all: true
         *   },
         * })
         *
         **/
        groupBy<
            T extends ConfigTableGroupByArgs,
            HasSelectOrTake extends Or<
                Extends<'skip', Keys<T>>,
                Extends<'take', Keys<T>>
            >,
            OrderByArg extends True extends HasSelectOrTake
                ? { orderBy: ConfigTableGroupByArgs['orderBy'] }
                : { orderBy?: ConfigTableGroupByArgs['orderBy'] },
            OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
            ByFields extends MaybeTupleToUnion<T['by']>,
            ByValid extends Has<ByFields, OrderFields>,
            HavingFields extends GetHavingFields<T['having']>,
            HavingValid extends Has<ByFields, HavingFields>,
            ByEmpty extends T['by'] extends never[] ? True : False,
            InputErrors extends ByEmpty extends True
                ? `Error: "by" must not be empty.`
                : HavingValid extends False
                    ? {
                        [P in HavingFields]: P extends ByFields
                            ? never
                            : P extends string
                                ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                                : [
                                    Error,
                                    'Field ',
                                    P,
                                    ` in "having" needs to be provided in "by"`,
                                ]
                    }[HavingFields]
                    : 'take' extends Keys<T>
                        ? 'orderBy' extends Keys<T>
                            ? ByValid extends True
                                ? {}
                                : {
                                    [P in OrderFields]: P extends ByFields
                                        ? never
                                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                                }[OrderFields]
                            : 'Error: If you provide "take", you also need to provide "orderBy"'
                        : 'skip' extends Keys<T>
                            ? 'orderBy' extends Keys<T>
                                ? ByValid extends True
                                    ? {}
                                    : {
                                        [P in OrderFields]: P extends ByFields
                                            ? never
                                            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                                    }[OrderFields]
                                : 'Error: If you provide "skip", you also need to provide "orderBy"'
                            : ByValid extends True
                                ? {}
                                : {
                                    [P in OrderFields]: P extends ByFields
                                        ? never
                                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                                }[OrderFields]
        >(args: SubsetIntersection<T, ConfigTableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfigTableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
    }

    /**
     * The delegate class that acts as a "Promise-like" for ConfigTable.
     * Why is this prefixed with `Prisma__`?
     * Because we want to prevent naming conflicts as mentioned in
     * https://github.com/prisma/prisma-client-js/issues/707
     */
    export interface Prisma__ConfigTableClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise"

        /**
         * Attaches callbacks for the resolution and/or rejection of the Promise.
         * @param onfulfilled The callback to execute when the Promise is resolved.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of which ever callback is executed.
         */
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>

        /**
         * Attaches a callback for only the rejection of the Promise.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of the callback.
         */
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>

        /**
         * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
         * resolved value cannot be modified from the callback.
         * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
         * @returns A Promise for the completion of the callback.
         */
        finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
    }


    /**
     * Fields of the ConfigTable model
     */
    export interface ConfigTableFieldRefs {
        readonly id: FieldRef<"ConfigTable", 'Int'>
        readonly name: FieldRef<"ConfigTable", 'String'>
        readonly title: FieldRef<"ConfigTable", 'String'>
        readonly description: FieldRef<"ConfigTable", 'String'>
        readonly createdAt: FieldRef<"ConfigTable", 'DateTime'>
        readonly updatedAt: FieldRef<"ConfigTable", 'DateTime'>
    }


    // Custom InputTypes
    /**
     * ConfigTable findUnique
     */
    export type ConfigTableFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigTable
         */
        select?: ConfigTableSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigTable
         */
        omit?: ConfigTableOmit<ExtArgs> | null
        /**
         * Filter, which ConfigTable to fetch.
         */
        where: ConfigTableWhereUniqueInput
    }

    /**
     * ConfigTable findUniqueOrThrow
     */
    export type ConfigTableFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigTable
         */
        select?: ConfigTableSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigTable
         */
        omit?: ConfigTableOmit<ExtArgs> | null
        /**
         * Filter, which ConfigTable to fetch.
         */
        where: ConfigTableWhereUniqueInput
    }

    /**
     * ConfigTable findFirst
     */
    export type ConfigTableFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigTable
         */
        select?: ConfigTableSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigTable
         */
        omit?: ConfigTableOmit<ExtArgs> | null
        /**
         * Filter, which ConfigTable to fetch.
         */
        where?: ConfigTableWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of ConfigTables to fetch.
         */
        orderBy?: ConfigTableOrderByWithRelationInput | ConfigTableOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for ConfigTables.
         */
        cursor?: ConfigTableWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` ConfigTables from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` ConfigTables.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of ConfigTables.
         */
        distinct?: ConfigTableScalarFieldEnum | ConfigTableScalarFieldEnum[]
    }

    /**
     * ConfigTable findFirstOrThrow
     */
    export type ConfigTableFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigTable
         */
        select?: ConfigTableSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigTable
         */
        omit?: ConfigTableOmit<ExtArgs> | null
        /**
         * Filter, which ConfigTable to fetch.
         */
        where?: ConfigTableWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of ConfigTables to fetch.
         */
        orderBy?: ConfigTableOrderByWithRelationInput | ConfigTableOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for ConfigTables.
         */
        cursor?: ConfigTableWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` ConfigTables from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` ConfigTables.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of ConfigTables.
         */
        distinct?: ConfigTableScalarFieldEnum | ConfigTableScalarFieldEnum[]
    }

    /**
     * ConfigTable findMany
     */
    export type ConfigTableFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigTable
         */
        select?: ConfigTableSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigTable
         */
        omit?: ConfigTableOmit<ExtArgs> | null
        /**
         * Filter, which ConfigTables to fetch.
         */
        where?: ConfigTableWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of ConfigTables to fetch.
         */
        orderBy?: ConfigTableOrderByWithRelationInput | ConfigTableOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for listing ConfigTables.
         */
        cursor?: ConfigTableWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` ConfigTables from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` ConfigTables.
         */
        skip?: number
        distinct?: ConfigTableScalarFieldEnum | ConfigTableScalarFieldEnum[]
    }

    /**
     * ConfigTable create
     */
    export type ConfigTableCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigTable
         */
        select?: ConfigTableSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigTable
         */
        omit?: ConfigTableOmit<ExtArgs> | null
        /**
         * The data needed to create a ConfigTable.
         */
        data: XOR<ConfigTableCreateInput, ConfigTableUncheckedCreateInput>
    }

    /**
     * ConfigTable createMany
     */
    export type ConfigTableCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * The data used to create many ConfigTables.
         */
        data: ConfigTableCreateManyInput | ConfigTableCreateManyInput[]
    }

    /**
     * ConfigTable createManyAndReturn
     */
    export type ConfigTableCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigTable
         */
        select?: ConfigTableSelectCreateManyAndReturn<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigTable
         */
        omit?: ConfigTableOmit<ExtArgs> | null
        /**
         * The data used to create many ConfigTables.
         */
        data: ConfigTableCreateManyInput | ConfigTableCreateManyInput[]
    }

    /**
     * ConfigTable update
     */
    export type ConfigTableUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigTable
         */
        select?: ConfigTableSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigTable
         */
        omit?: ConfigTableOmit<ExtArgs> | null
        /**
         * The data needed to update a ConfigTable.
         */
        data: XOR<ConfigTableUpdateInput, ConfigTableUncheckedUpdateInput>
        /**
         * Choose, which ConfigTable to update.
         */
        where: ConfigTableWhereUniqueInput
    }

    /**
     * ConfigTable updateMany
     */
    export type ConfigTableUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * The data used to update ConfigTables.
         */
        data: XOR<ConfigTableUpdateManyMutationInput, ConfigTableUncheckedUpdateManyInput>
        /**
         * Filter which ConfigTables to update
         */
        where?: ConfigTableWhereInput
        /**
         * Limit how many ConfigTables to update.
         */
        limit?: number
    }

    /**
     * ConfigTable updateManyAndReturn
     */
    export type ConfigTableUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigTable
         */
        select?: ConfigTableSelectUpdateManyAndReturn<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigTable
         */
        omit?: ConfigTableOmit<ExtArgs> | null
        /**
         * The data used to update ConfigTables.
         */
        data: XOR<ConfigTableUpdateManyMutationInput, ConfigTableUncheckedUpdateManyInput>
        /**
         * Filter which ConfigTables to update
         */
        where?: ConfigTableWhereInput
        /**
         * Limit how many ConfigTables to update.
         */
        limit?: number
    }

    /**
     * ConfigTable upsert
     */
    export type ConfigTableUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigTable
         */
        select?: ConfigTableSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigTable
         */
        omit?: ConfigTableOmit<ExtArgs> | null
        /**
         * The filter to search for the ConfigTable to update in case it exists.
         */
        where: ConfigTableWhereUniqueInput
        /**
         * In case the ConfigTable found by the `where` argument doesn't exist, create a new ConfigTable with this data.
         */
        create: XOR<ConfigTableCreateInput, ConfigTableUncheckedCreateInput>
        /**
         * In case the ConfigTable was found with the provided `where` argument, update it with this data.
         */
        update: XOR<ConfigTableUpdateInput, ConfigTableUncheckedUpdateInput>
    }

    /**
     * ConfigTable delete
     */
    export type ConfigTableDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigTable
         */
        select?: ConfigTableSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigTable
         */
        omit?: ConfigTableOmit<ExtArgs> | null
        /**
         * Filter which ConfigTable to delete.
         */
        where: ConfigTableWhereUniqueInput
    }

    /**
     * ConfigTable deleteMany
     */
    export type ConfigTableDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Filter which ConfigTables to delete
         */
        where?: ConfigTableWhereInput
        /**
         * Limit how many ConfigTables to delete.
         */
        limit?: number
    }

    /**
     * ConfigTable without action
     */
    export type ConfigTableDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigTable
         */
        select?: ConfigTableSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigTable
         */
        omit?: ConfigTableOmit<ExtArgs> | null
    }


    /**
     * Model ConfigColumn
     */

    export type AggregateConfigColumn = {
        _count: ConfigColumnCountAggregateOutputType | null
        _avg: ConfigColumnAvgAggregateOutputType | null
        _sum: ConfigColumnSumAggregateOutputType | null
        _min: ConfigColumnMinAggregateOutputType | null
        _max: ConfigColumnMaxAggregateOutputType | null
    }

    export type ConfigColumnAvgAggregateOutputType = {
        id: number | null
        tableId: number | null
        order: number | null
    }

    export type ConfigColumnSumAggregateOutputType = {
        id: number | null
        tableId: number | null
        order: number | null
    }

    export type ConfigColumnMinAggregateOutputType = {
        id: number | null
        name: string | null
        title: string | null
        desc: string | null
        tableId: number | null
        dataType: string | null
        dataIndex: string | null
        isShow: boolean | null
        isEdit: boolean | null
        order: number | null
    }

    export type ConfigColumnMaxAggregateOutputType = {
        id: number | null
        name: string | null
        title: string | null
        desc: string | null
        tableId: number | null
        dataType: string | null
        dataIndex: string | null
        isShow: boolean | null
        isEdit: boolean | null
        order: number | null
    }

    export type ConfigColumnCountAggregateOutputType = {
        id: number
        name: number
        title: number
        desc: number
        tableId: number
        dataType: number
        dataIndex: number
        isShow: number
        isEdit: number
        order: number
        _all: number
    }


    export type ConfigColumnAvgAggregateInputType = {
        id?: true
        tableId?: true
        order?: true
    }

    export type ConfigColumnSumAggregateInputType = {
        id?: true
        tableId?: true
        order?: true
    }

    export type ConfigColumnMinAggregateInputType = {
        id?: true
        name?: true
        title?: true
        desc?: true
        tableId?: true
        dataType?: true
        dataIndex?: true
        isShow?: true
        isEdit?: true
        order?: true
    }

    export type ConfigColumnMaxAggregateInputType = {
        id?: true
        name?: true
        title?: true
        desc?: true
        tableId?: true
        dataType?: true
        dataIndex?: true
        isShow?: true
        isEdit?: true
        order?: true
    }

    export type ConfigColumnCountAggregateInputType = {
        id?: true
        name?: true
        title?: true
        desc?: true
        tableId?: true
        dataType?: true
        dataIndex?: true
        isShow?: true
        isEdit?: true
        order?: true
        _all?: true
    }

    export type ConfigColumnAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Filter which ConfigColumn to aggregate.
         */
        where?: ConfigColumnWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of ConfigColumns to fetch.
         */
        orderBy?: ConfigColumnOrderByWithRelationInput | ConfigColumnOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the start position
         */
        cursor?: ConfigColumnWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` ConfigColumns from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` ConfigColumns.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Count returned ConfigColumns
         **/
        _count?: true | ConfigColumnCountAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to average
         **/
        _avg?: ConfigColumnAvgAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to sum
         **/
        _sum?: ConfigColumnSumAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the minimum value
         **/
        _min?: ConfigColumnMinAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the maximum value
         **/
        _max?: ConfigColumnMaxAggregateInputType
    }

    export type GetConfigColumnAggregateType<T extends ConfigColumnAggregateArgs> = {
        [P in keyof T & keyof AggregateConfigColumn]: P extends '_count' | 'count'
            ? T[P] extends true
                ? number
                : GetScalarType<T[P], AggregateConfigColumn[P]>
            : GetScalarType<T[P], AggregateConfigColumn[P]>
    }


    export type ConfigColumnGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        where?: ConfigColumnWhereInput
        orderBy?: ConfigColumnOrderByWithAggregationInput | ConfigColumnOrderByWithAggregationInput[]
        by: ConfigColumnScalarFieldEnum[] | ConfigColumnScalarFieldEnum
        having?: ConfigColumnScalarWhereWithAggregatesInput
        take?: number
        skip?: number
        _count?: ConfigColumnCountAggregateInputType | true
        _avg?: ConfigColumnAvgAggregateInputType
        _sum?: ConfigColumnSumAggregateInputType
        _min?: ConfigColumnMinAggregateInputType
        _max?: ConfigColumnMaxAggregateInputType
    }

    export type ConfigColumnGroupByOutputType = {
        id: number
        name: string
        title: string
        desc: string
        tableId: number
        dataType: string
        dataIndex: string
        isShow: boolean
        isEdit: boolean
        order: number
        _count: ConfigColumnCountAggregateOutputType | null
        _avg: ConfigColumnAvgAggregateOutputType | null
        _sum: ConfigColumnSumAggregateOutputType | null
        _min: ConfigColumnMinAggregateOutputType | null
        _max: ConfigColumnMaxAggregateOutputType | null
    }

    type GetConfigColumnGroupByPayload<T extends ConfigColumnGroupByArgs> = Prisma.PrismaPromise<
        Array<
            PickEnumerable<ConfigColumnGroupByOutputType, T['by']> &
            {
                [P in ((keyof T) & (keyof ConfigColumnGroupByOutputType))]: P extends '_count'
                ? T[P] extends boolean
                    ? number
                    : GetScalarType<T[P], ConfigColumnGroupByOutputType[P]>
                : GetScalarType<T[P], ConfigColumnGroupByOutputType[P]>
            }
        >
    >


    export type ConfigColumnSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
        id?: boolean
        name?: boolean
        title?: boolean
        desc?: boolean
        tableId?: boolean
        dataType?: boolean
        dataIndex?: boolean
        isShow?: boolean
        isEdit?: boolean
        order?: boolean
    }, ExtArgs["result"]["configColumn"]>

    export type ConfigColumnSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
        id?: boolean
        name?: boolean
        title?: boolean
        desc?: boolean
        tableId?: boolean
        dataType?: boolean
        dataIndex?: boolean
        isShow?: boolean
        isEdit?: boolean
        order?: boolean
    }, ExtArgs["result"]["configColumn"]>

    export type ConfigColumnSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
        id?: boolean
        name?: boolean
        title?: boolean
        desc?: boolean
        tableId?: boolean
        dataType?: boolean
        dataIndex?: boolean
        isShow?: boolean
        isEdit?: boolean
        order?: boolean
    }, ExtArgs["result"]["configColumn"]>

    export type ConfigColumnSelectScalar = {
        id?: boolean
        name?: boolean
        title?: boolean
        desc?: boolean
        tableId?: boolean
        dataType?: boolean
        dataIndex?: boolean
        isShow?: boolean
        isEdit?: boolean
        order?: boolean
    }

    export type ConfigColumnOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "title" | "desc" | "tableId" | "dataType" | "dataIndex" | "isShow" | "isEdit" | "order", ExtArgs["result"]["configColumn"]>

    export type $ConfigColumnPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        name: "ConfigColumn"
        objects: {}
        scalars: runtime.Types.Extensions.GetPayloadResult<{
            id: number
            name: string
            title: string
            desc: string
            tableId: number
            dataType: string
            dataIndex: string
            isShow: boolean
            isEdit: boolean
            order: number
        }, ExtArgs["result"]["configColumn"]>
        composites: {}
    }

    export type ConfigColumnGetPayload<S extends boolean | null | undefined | ConfigColumnDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConfigColumnPayload, S>

    export type ConfigColumnCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
        Omit<ConfigColumnFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: ConfigColumnCountAggregateInputType | true
    }

    export interface ConfigColumnDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        /**
         * Fields of the ConfigColumn model
         */
        readonly fields: ConfigColumnFieldRefs;

        [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConfigColumn'], meta: { name: 'ConfigColumn' } }

        /**
         * Find zero or one ConfigColumn that matches the filter.
         * @param {ConfigColumnFindUniqueArgs} args - Arguments to find a ConfigColumn
         * @example
         * // Get one ConfigColumn
         * const configColumn = await prisma.configColumn.findUnique({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUnique<T extends ConfigColumnFindUniqueArgs>(args: SelectSubset<T, ConfigColumnFindUniqueArgs<ExtArgs>>): Prisma__ConfigColumnClient<runtime.Types.Result.GetResult<Prisma.$ConfigColumnPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

        /**
         * Find one ConfigColumn that matches the filter or throw an error with `error.code='P2025'`
         * if no matches were found.
         * @param {ConfigColumnFindUniqueOrThrowArgs} args - Arguments to find a ConfigColumn
         * @example
         * // Get one ConfigColumn
         * const configColumn = await prisma.configColumn.findUniqueOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUniqueOrThrow<T extends ConfigColumnFindUniqueOrThrowArgs>(args: SelectSubset<T, ConfigColumnFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConfigColumnClient<runtime.Types.Result.GetResult<Prisma.$ConfigColumnPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Find the first ConfigColumn that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConfigColumnFindFirstArgs} args - Arguments to find a ConfigColumn
         * @example
         * // Get one ConfigColumn
         * const configColumn = await prisma.configColumn.findFirst({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirst<T extends ConfigColumnFindFirstArgs>(args?: SelectSubset<T, ConfigColumnFindFirstArgs<ExtArgs>>): Prisma__ConfigColumnClient<runtime.Types.Result.GetResult<Prisma.$ConfigColumnPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

        /**
         * Find the first ConfigColumn that matches the filter or
         * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConfigColumnFindFirstOrThrowArgs} args - Arguments to find a ConfigColumn
         * @example
         * // Get one ConfigColumn
         * const configColumn = await prisma.configColumn.findFirstOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirstOrThrow<T extends ConfigColumnFindFirstOrThrowArgs>(args?: SelectSubset<T, ConfigColumnFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConfigColumnClient<runtime.Types.Result.GetResult<Prisma.$ConfigColumnPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Find zero or more ConfigColumns that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConfigColumnFindManyArgs} args - Arguments to filter and select certain fields only.
         * @example
         * // Get all ConfigColumns
         * const configColumns = await prisma.configColumn.findMany()
         *
         * // Get first 10 ConfigColumns
         * const configColumns = await prisma.configColumn.findMany({ take: 10 })
         *
         * // Only select the `id`
         * const configColumnWithIdOnly = await prisma.configColumn.findMany({ select: { id: true } })
         *
         */
        findMany<T extends ConfigColumnFindManyArgs>(args?: SelectSubset<T, ConfigColumnFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfigColumnPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

        /**
         * Create a ConfigColumn.
         * @param {ConfigColumnCreateArgs} args - Arguments to create a ConfigColumn.
         * @example
         * // Create one ConfigColumn
         * const ConfigColumn = await prisma.configColumn.create({
         *   data: {
         *     // ... data to create a ConfigColumn
         *   }
         * })
         *
         */
        create<T extends ConfigColumnCreateArgs>(args: SelectSubset<T, ConfigColumnCreateArgs<ExtArgs>>): Prisma__ConfigColumnClient<runtime.Types.Result.GetResult<Prisma.$ConfigColumnPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Create many ConfigColumns.
         * @param {ConfigColumnCreateManyArgs} args - Arguments to create many ConfigColumns.
         * @example
         * // Create many ConfigColumns
         * const configColumn = await prisma.configColumn.createMany({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         */
        createMany<T extends ConfigColumnCreateManyArgs>(args?: SelectSubset<T, ConfigColumnCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

        /**
         * Create many ConfigColumns and returns the data saved in the database.
         * @param {ConfigColumnCreateManyAndReturnArgs} args - Arguments to create many ConfigColumns.
         * @example
         * // Create many ConfigColumns
         * const configColumn = await prisma.configColumn.createManyAndReturn({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Create many ConfigColumns and only return the `id`
         * const configColumnWithIdOnly = await prisma.configColumn.createManyAndReturn({
         *   select: { id: true },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        createManyAndReturn<T extends ConfigColumnCreateManyAndReturnArgs>(args?: SelectSubset<T, ConfigColumnCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfigColumnPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

        /**
         * Delete a ConfigColumn.
         * @param {ConfigColumnDeleteArgs} args - Arguments to delete one ConfigColumn.
         * @example
         * // Delete one ConfigColumn
         * const ConfigColumn = await prisma.configColumn.delete({
         *   where: {
         *     // ... filter to delete one ConfigColumn
         *   }
         * })
         *
         */
        delete<T extends ConfigColumnDeleteArgs>(args: SelectSubset<T, ConfigColumnDeleteArgs<ExtArgs>>): Prisma__ConfigColumnClient<runtime.Types.Result.GetResult<Prisma.$ConfigColumnPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Update one ConfigColumn.
         * @param {ConfigColumnUpdateArgs} args - Arguments to update one ConfigColumn.
         * @example
         * // Update one ConfigColumn
         * const configColumn = await prisma.configColumn.update({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        update<T extends ConfigColumnUpdateArgs>(args: SelectSubset<T, ConfigColumnUpdateArgs<ExtArgs>>): Prisma__ConfigColumnClient<runtime.Types.Result.GetResult<Prisma.$ConfigColumnPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Delete zero or more ConfigColumns.
         * @param {ConfigColumnDeleteManyArgs} args - Arguments to filter ConfigColumns to delete.
         * @example
         * // Delete a few ConfigColumns
         * const { count } = await prisma.configColumn.deleteMany({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         *
         */
        deleteMany<T extends ConfigColumnDeleteManyArgs>(args?: SelectSubset<T, ConfigColumnDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

        /**
         * Update zero or more ConfigColumns.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConfigColumnUpdateManyArgs} args - Arguments to update one or more rows.
         * @example
         * // Update many ConfigColumns
         * const configColumn = await prisma.configColumn.updateMany({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        updateMany<T extends ConfigColumnUpdateManyArgs>(args: SelectSubset<T, ConfigColumnUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

        /**
         * Update zero or more ConfigColumns and returns the data updated in the database.
         * @param {ConfigColumnUpdateManyAndReturnArgs} args - Arguments to update many ConfigColumns.
         * @example
         * // Update many ConfigColumns
         * const configColumn = await prisma.configColumn.updateManyAndReturn({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Update zero or more ConfigColumns and only return the `id`
         * const configColumnWithIdOnly = await prisma.configColumn.updateManyAndReturn({
         *   select: { id: true },
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        updateManyAndReturn<T extends ConfigColumnUpdateManyAndReturnArgs>(args: SelectSubset<T, ConfigColumnUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConfigColumnPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

        /**
         * Create or update one ConfigColumn.
         * @param {ConfigColumnUpsertArgs} args - Arguments to update or create a ConfigColumn.
         * @example
         * // Update or create a ConfigColumn
         * const configColumn = await prisma.configColumn.upsert({
         *   create: {
         *     // ... data to create a ConfigColumn
         *   },
         *   update: {
         *     // ... in case it already exists, update
         *   },
         *   where: {
         *     // ... the filter for the ConfigColumn we want to update
         *   }
         * })
         */
        upsert<T extends ConfigColumnUpsertArgs>(args: SelectSubset<T, ConfigColumnUpsertArgs<ExtArgs>>): Prisma__ConfigColumnClient<runtime.Types.Result.GetResult<Prisma.$ConfigColumnPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Count the number of ConfigColumns.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConfigColumnCountArgs} args - Arguments to filter ConfigColumns to count.
         * @example
         * // Count the number of ConfigColumns
         * const count = await prisma.configColumn.count({
         *   where: {
         *     // ... the filter for the ConfigColumns we want to count
         *   }
         * })
         **/
        count<T extends ConfigColumnCountArgs>(
            args?: Subset<T, ConfigColumnCountArgs>,
        ): Prisma.PrismaPromise<
            T extends runtime.Types.Utils.Record<'select', any>
                ? T['select'] extends true
                    ? number
                    : GetScalarType<T['select'], ConfigColumnCountAggregateOutputType>
                : number
        >

        /**
         * Allows you to perform aggregations operations on a ConfigColumn.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConfigColumnAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
         * @example
         * // Ordered by age ascending
         * // Where email contains prisma.io
         * // Limited to the 10 users
         * const aggregations = await prisma.user.aggregate({
         *   _avg: {
         *     age: true,
         *   },
         *   where: {
         *     email: {
         *       contains: "prisma.io",
         *     },
         *   },
         *   orderBy: {
         *     age: "asc",
         *   },
         *   take: 10,
         * })
         **/
        aggregate<T extends ConfigColumnAggregateArgs>(args: Subset<T, ConfigColumnAggregateArgs>): Prisma.PrismaPromise<GetConfigColumnAggregateType<T>>

        /**
         * Group by ConfigColumn.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {ConfigColumnGroupByArgs} args - Group by arguments.
         * @example
         * // Group by city, order by createdAt, get count
         * const result = await prisma.user.groupBy({
         *   by: ['city', 'createdAt'],
         *   orderBy: {
         *     createdAt: true
         *   },
         *   _count: {
         *     _all: true
         *   },
         * })
         *
         **/
        groupBy<
            T extends ConfigColumnGroupByArgs,
            HasSelectOrTake extends Or<
                Extends<'skip', Keys<T>>,
                Extends<'take', Keys<T>>
            >,
            OrderByArg extends True extends HasSelectOrTake
                ? { orderBy: ConfigColumnGroupByArgs['orderBy'] }
                : { orderBy?: ConfigColumnGroupByArgs['orderBy'] },
            OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
            ByFields extends MaybeTupleToUnion<T['by']>,
            ByValid extends Has<ByFields, OrderFields>,
            HavingFields extends GetHavingFields<T['having']>,
            HavingValid extends Has<ByFields, HavingFields>,
            ByEmpty extends T['by'] extends never[] ? True : False,
            InputErrors extends ByEmpty extends True
                ? `Error: "by" must not be empty.`
                : HavingValid extends False
                    ? {
                        [P in HavingFields]: P extends ByFields
                            ? never
                            : P extends string
                                ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                                : [
                                    Error,
                                    'Field ',
                                    P,
                                    ` in "having" needs to be provided in "by"`,
                                ]
                    }[HavingFields]
                    : 'take' extends Keys<T>
                        ? 'orderBy' extends Keys<T>
                            ? ByValid extends True
                                ? {}
                                : {
                                    [P in OrderFields]: P extends ByFields
                                        ? never
                                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                                }[OrderFields]
                            : 'Error: If you provide "take", you also need to provide "orderBy"'
                        : 'skip' extends Keys<T>
                            ? 'orderBy' extends Keys<T>
                                ? ByValid extends True
                                    ? {}
                                    : {
                                        [P in OrderFields]: P extends ByFields
                                            ? never
                                            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                                    }[OrderFields]
                                : 'Error: If you provide "skip", you also need to provide "orderBy"'
                            : ByValid extends True
                                ? {}
                                : {
                                    [P in OrderFields]: P extends ByFields
                                        ? never
                                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                                }[OrderFields]
        >(args: SubsetIntersection<T, ConfigColumnGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfigColumnGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
    }

    /**
     * The delegate class that acts as a "Promise-like" for ConfigColumn.
     * Why is this prefixed with `Prisma__`?
     * Because we want to prevent naming conflicts as mentioned in
     * https://github.com/prisma/prisma-client-js/issues/707
     */
    export interface Prisma__ConfigColumnClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise"

        /**
         * Attaches callbacks for the resolution and/or rejection of the Promise.
         * @param onfulfilled The callback to execute when the Promise is resolved.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of which ever callback is executed.
         */
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>

        /**
         * Attaches a callback for only the rejection of the Promise.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of the callback.
         */
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>

        /**
         * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
         * resolved value cannot be modified from the callback.
         * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
         * @returns A Promise for the completion of the callback.
         */
        finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
    }


    /**
     * Fields of the ConfigColumn model
     */
    export interface ConfigColumnFieldRefs {
        readonly id: FieldRef<"ConfigColumn", 'Int'>
        readonly name: FieldRef<"ConfigColumn", 'String'>
        readonly title: FieldRef<"ConfigColumn", 'String'>
        readonly desc: FieldRef<"ConfigColumn", 'String'>
        readonly tableId: FieldRef<"ConfigColumn", 'Int'>
        readonly dataType: FieldRef<"ConfigColumn", 'String'>
        readonly dataIndex: FieldRef<"ConfigColumn", 'String'>
        readonly isShow: FieldRef<"ConfigColumn", 'Boolean'>
        readonly isEdit: FieldRef<"ConfigColumn", 'Boolean'>
        readonly order: FieldRef<"ConfigColumn", 'Int'>
    }


    // Custom InputTypes
    /**
     * ConfigColumn findUnique
     */
    export type ConfigColumnFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigColumn
         */
        select?: ConfigColumnSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigColumn
         */
        omit?: ConfigColumnOmit<ExtArgs> | null
        /**
         * Filter, which ConfigColumn to fetch.
         */
        where: ConfigColumnWhereUniqueInput
    }

    /**
     * ConfigColumn findUniqueOrThrow
     */
    export type ConfigColumnFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigColumn
         */
        select?: ConfigColumnSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigColumn
         */
        omit?: ConfigColumnOmit<ExtArgs> | null
        /**
         * Filter, which ConfigColumn to fetch.
         */
        where: ConfigColumnWhereUniqueInput
    }

    /**
     * ConfigColumn findFirst
     */
    export type ConfigColumnFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigColumn
         */
        select?: ConfigColumnSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigColumn
         */
        omit?: ConfigColumnOmit<ExtArgs> | null
        /**
         * Filter, which ConfigColumn to fetch.
         */
        where?: ConfigColumnWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of ConfigColumns to fetch.
         */
        orderBy?: ConfigColumnOrderByWithRelationInput | ConfigColumnOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for ConfigColumns.
         */
        cursor?: ConfigColumnWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` ConfigColumns from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` ConfigColumns.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of ConfigColumns.
         */
        distinct?: ConfigColumnScalarFieldEnum | ConfigColumnScalarFieldEnum[]
    }

    /**
     * ConfigColumn findFirstOrThrow
     */
    export type ConfigColumnFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigColumn
         */
        select?: ConfigColumnSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigColumn
         */
        omit?: ConfigColumnOmit<ExtArgs> | null
        /**
         * Filter, which ConfigColumn to fetch.
         */
        where?: ConfigColumnWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of ConfigColumns to fetch.
         */
        orderBy?: ConfigColumnOrderByWithRelationInput | ConfigColumnOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for ConfigColumns.
         */
        cursor?: ConfigColumnWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` ConfigColumns from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` ConfigColumns.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of ConfigColumns.
         */
        distinct?: ConfigColumnScalarFieldEnum | ConfigColumnScalarFieldEnum[]
    }

    /**
     * ConfigColumn findMany
     */
    export type ConfigColumnFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigColumn
         */
        select?: ConfigColumnSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigColumn
         */
        omit?: ConfigColumnOmit<ExtArgs> | null
        /**
         * Filter, which ConfigColumns to fetch.
         */
        where?: ConfigColumnWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of ConfigColumns to fetch.
         */
        orderBy?: ConfigColumnOrderByWithRelationInput | ConfigColumnOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for listing ConfigColumns.
         */
        cursor?: ConfigColumnWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` ConfigColumns from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` ConfigColumns.
         */
        skip?: number
        distinct?: ConfigColumnScalarFieldEnum | ConfigColumnScalarFieldEnum[]
    }

    /**
     * ConfigColumn create
     */
    export type ConfigColumnCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigColumn
         */
        select?: ConfigColumnSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigColumn
         */
        omit?: ConfigColumnOmit<ExtArgs> | null
        /**
         * The data needed to create a ConfigColumn.
         */
        data: XOR<ConfigColumnCreateInput, ConfigColumnUncheckedCreateInput>
    }

    /**
     * ConfigColumn createMany
     */
    export type ConfigColumnCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * The data used to create many ConfigColumns.
         */
        data: ConfigColumnCreateManyInput | ConfigColumnCreateManyInput[]
    }

    /**
     * ConfigColumn createManyAndReturn
     */
    export type ConfigColumnCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigColumn
         */
        select?: ConfigColumnSelectCreateManyAndReturn<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigColumn
         */
        omit?: ConfigColumnOmit<ExtArgs> | null
        /**
         * The data used to create many ConfigColumns.
         */
        data: ConfigColumnCreateManyInput | ConfigColumnCreateManyInput[]
    }

    /**
     * ConfigColumn update
     */
    export type ConfigColumnUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigColumn
         */
        select?: ConfigColumnSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigColumn
         */
        omit?: ConfigColumnOmit<ExtArgs> | null
        /**
         * The data needed to update a ConfigColumn.
         */
        data: XOR<ConfigColumnUpdateInput, ConfigColumnUncheckedUpdateInput>
        /**
         * Choose, which ConfigColumn to update.
         */
        where: ConfigColumnWhereUniqueInput
    }

    /**
     * ConfigColumn updateMany
     */
    export type ConfigColumnUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * The data used to update ConfigColumns.
         */
        data: XOR<ConfigColumnUpdateManyMutationInput, ConfigColumnUncheckedUpdateManyInput>
        /**
         * Filter which ConfigColumns to update
         */
        where?: ConfigColumnWhereInput
        /**
         * Limit how many ConfigColumns to update.
         */
        limit?: number
    }

    /**
     * ConfigColumn updateManyAndReturn
     */
    export type ConfigColumnUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigColumn
         */
        select?: ConfigColumnSelectUpdateManyAndReturn<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigColumn
         */
        omit?: ConfigColumnOmit<ExtArgs> | null
        /**
         * The data used to update ConfigColumns.
         */
        data: XOR<ConfigColumnUpdateManyMutationInput, ConfigColumnUncheckedUpdateManyInput>
        /**
         * Filter which ConfigColumns to update
         */
        where?: ConfigColumnWhereInput
        /**
         * Limit how many ConfigColumns to update.
         */
        limit?: number
    }

    /**
     * ConfigColumn upsert
     */
    export type ConfigColumnUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigColumn
         */
        select?: ConfigColumnSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigColumn
         */
        omit?: ConfigColumnOmit<ExtArgs> | null
        /**
         * The filter to search for the ConfigColumn to update in case it exists.
         */
        where: ConfigColumnWhereUniqueInput
        /**
         * In case the ConfigColumn found by the `where` argument doesn't exist, create a new ConfigColumn with this data.
         */
        create: XOR<ConfigColumnCreateInput, ConfigColumnUncheckedCreateInput>
        /**
         * In case the ConfigColumn was found with the provided `where` argument, update it with this data.
         */
        update: XOR<ConfigColumnUpdateInput, ConfigColumnUncheckedUpdateInput>
    }

    /**
     * ConfigColumn delete
     */
    export type ConfigColumnDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigColumn
         */
        select?: ConfigColumnSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigColumn
         */
        omit?: ConfigColumnOmit<ExtArgs> | null
        /**
         * Filter which ConfigColumn to delete.
         */
        where: ConfigColumnWhereUniqueInput
    }

    /**
     * ConfigColumn deleteMany
     */
    export type ConfigColumnDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Filter which ConfigColumns to delete
         */
        where?: ConfigColumnWhereInput
        /**
         * Limit how many ConfigColumns to delete.
         */
        limit?: number
    }

    /**
     * ConfigColumn without action
     */
    export type ConfigColumnDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the ConfigColumn
         */
        select?: ConfigColumnSelect<ExtArgs> | null
        /**
         * Omit specific fields from the ConfigColumn
         */
        omit?: ConfigColumnOmit<ExtArgs> | null
    }


    /**
     * Model User
     */

    export type AggregateUser = {
        _count: UserCountAggregateOutputType | null
        _avg: UserAvgAggregateOutputType | null
        _sum: UserSumAggregateOutputType | null
        _min: UserMinAggregateOutputType | null
        _max: UserMaxAggregateOutputType | null
    }

    export type UserAvgAggregateOutputType = {
        id: number | null
    }

    export type UserSumAggregateOutputType = {
        id: number | null
    }

    export type UserMinAggregateOutputType = {
        id: number | null
        username: string | null
        email: string | null
    }

    export type UserMaxAggregateOutputType = {
        id: number | null
        username: string | null
        email: string | null
    }

    export type UserCountAggregateOutputType = {
        id: number
        username: number
        email: number
        _all: number
    }


    export type UserAvgAggregateInputType = {
        id?: true
    }

    export type UserSumAggregateInputType = {
        id?: true
    }

    export type UserMinAggregateInputType = {
        id?: true
        username?: true
        email?: true
    }

    export type UserMaxAggregateInputType = {
        id?: true
        username?: true
        email?: true
    }

    export type UserCountAggregateInputType = {
        id?: true
        username?: true
        email?: true
        _all?: true
    }

    export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Filter which User to aggregate.
         */
        where?: UserWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Users to fetch.
         */
        orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the start position
         */
        cursor?: UserWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Users from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Users.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Count returned Users
         **/
        _count?: true | UserCountAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to average
         **/
        _avg?: UserAvgAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to sum
         **/
        _sum?: UserSumAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the minimum value
         **/
        _min?: UserMinAggregateInputType
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
         *
         * Select which fields to find the maximum value
         **/
        _max?: UserMaxAggregateInputType
    }

    export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
            ? T[P] extends true
                ? number
                : GetScalarType<T[P], AggregateUser[P]>
            : GetScalarType<T[P], AggregateUser[P]>
    }


    export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        where?: UserWhereInput
        orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
        by: UserScalarFieldEnum[] | UserScalarFieldEnum
        having?: UserScalarWhereWithAggregatesInput
        take?: number
        skip?: number
        _count?: UserCountAggregateInputType | true
        _avg?: UserAvgAggregateInputType
        _sum?: UserSumAggregateInputType
        _min?: UserMinAggregateInputType
        _max?: UserMaxAggregateInputType
    }

    export type UserGroupByOutputType = {
        id: number
        username: string
        email: string | null
        _count: UserCountAggregateOutputType | null
        _avg: UserAvgAggregateOutputType | null
        _sum: UserSumAggregateOutputType | null
        _min: UserMinAggregateOutputType | null
        _max: UserMaxAggregateOutputType | null
    }

    type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
        Array<
            PickEnumerable<UserGroupByOutputType, T['by']> &
            {
                [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
                ? T[P] extends boolean
                    ? number
                    : GetScalarType<T[P], UserGroupByOutputType[P]>
                : GetScalarType<T[P], UserGroupByOutputType[P]>
            }
        >
    >


    export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
        id?: boolean
        username?: boolean
        email?: boolean
    }, ExtArgs["result"]["user"]>

    export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
        id?: boolean
        username?: boolean
        email?: boolean
    }, ExtArgs["result"]["user"]>

    export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
        id?: boolean
        username?: boolean
        email?: boolean
    }, ExtArgs["result"]["user"]>

    export type UserSelectScalar = {
        id?: boolean
        username?: boolean
        email?: boolean
    }

    export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "username" | "email", ExtArgs["result"]["user"]>

    export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        name: "User"
        objects: {}
        scalars: runtime.Types.Extensions.GetPayloadResult<{
            id: number
            username: string
            email: string | null
        }, ExtArgs["result"]["user"]>
        composites: {}
    }

    export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>

    export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> =
        Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
        select?: UserCountAggregateInputType | true
    }

    export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
        /**
         * Fields of the User model
         */
        readonly fields: UserFieldRefs;

        [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }

        /**
         * Find zero or one User that matches the filter.
         * @param {UserFindUniqueArgs} args - Arguments to find a User
         * @example
         * // Get one User
         * const user = await prisma.user.findUnique({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

        /**
         * Find one User that matches the filter or throw an error with `error.code='P2025'`
         * if no matches were found.
         * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
         * @example
         * // Get one User
         * const user = await prisma.user.findUniqueOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Find the first User that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {UserFindFirstArgs} args - Arguments to find a User
         * @example
         * // Get one User
         * const user = await prisma.user.findFirst({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

        /**
         * Find the first User that matches the filter or
         * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
         * @example
         * // Get one User
         * const user = await prisma.user.findFirstOrThrow({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         */
        findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Find zero or more Users that matches the filter.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
         * @example
         * // Get all Users
         * const users = await prisma.user.findMany()
         *
         * // Get first 10 Users
         * const users = await prisma.user.findMany({ take: 10 })
         *
         * // Only select the `id`
         * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
         *
         */
        findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

        /**
         * Create a User.
         * @param {UserCreateArgs} args - Arguments to create a User.
         * @example
         * // Create one User
         * const User = await prisma.user.create({
         *   data: {
         *     // ... data to create a User
         *   }
         * })
         *
         */
        create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Create many Users.
         * @param {UserCreateManyArgs} args - Arguments to create many Users.
         * @example
         * // Create many Users
         * const user = await prisma.user.createMany({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         */
        createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

        /**
         * Create many Users and returns the data saved in the database.
         * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
         * @example
         * // Create many Users
         * const user = await prisma.user.createManyAndReturn({
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Create many Users and only return the `id`
         * const userWithIdOnly = await prisma.user.createManyAndReturn({
         *   select: { id: true },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

        /**
         * Delete a User.
         * @param {UserDeleteArgs} args - Arguments to delete one User.
         * @example
         * // Delete one User
         * const User = await prisma.user.delete({
         *   where: {
         *     // ... filter to delete one User
         *   }
         * })
         *
         */
        delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Update one User.
         * @param {UserUpdateArgs} args - Arguments to update one User.
         * @example
         * // Update one User
         * const user = await prisma.user.update({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Delete zero or more Users.
         * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
         * @example
         * // Delete a few Users
         * const { count } = await prisma.user.deleteMany({
         *   where: {
         *     // ... provide filter here
         *   }
         * })
         *
         */
        deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

        /**
         * Update zero or more Users.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
         * @example
         * // Update many Users
         * const user = await prisma.user.updateMany({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: {
         *     // ... provide data here
         *   }
         * })
         *
         */
        updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

        /**
         * Update zero or more Users and returns the data updated in the database.
         * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
         * @example
         * // Update many Users
         * const user = await prisma.user.updateManyAndReturn({
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         *
         * // Update zero or more Users and only return the `id`
         * const userWithIdOnly = await prisma.user.updateManyAndReturn({
         *   select: { id: true },
         *   where: {
         *     // ... provide filter here
         *   },
         *   data: [
         *     // ... provide data here
         *   ]
         * })
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         *
         */
        updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

        /**
         * Create or update one User.
         * @param {UserUpsertArgs} args - Arguments to update or create a User.
         * @example
         * // Update or create a User
         * const user = await prisma.user.upsert({
         *   create: {
         *     // ... data to create a User
         *   },
         *   update: {
         *     // ... in case it already exists, update
         *   },
         *   where: {
         *     // ... the filter for the User we want to update
         *   }
         * })
         */
        upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

        /**
         * Count the number of Users.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {UserCountArgs} args - Arguments to filter Users to count.
         * @example
         * // Count the number of Users
         * const count = await prisma.user.count({
         *   where: {
         *     // ... the filter for the Users we want to count
         *   }
         * })
         **/
        count<T extends UserCountArgs>(
            args?: Subset<T, UserCountArgs>,
        ): Prisma.PrismaPromise<
            T extends runtime.Types.Utils.Record<'select', any>
                ? T['select'] extends true
                    ? number
                    : GetScalarType<T['select'], UserCountAggregateOutputType>
                : number
        >

        /**
         * Allows you to perform aggregations operations on a User.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
         * @example
         * // Ordered by age ascending
         * // Where email contains prisma.io
         * // Limited to the 10 users
         * const aggregations = await prisma.user.aggregate({
         *   _avg: {
         *     age: true,
         *   },
         *   where: {
         *     email: {
         *       contains: "prisma.io",
         *     },
         *   },
         *   orderBy: {
         *     age: "asc",
         *   },
         *   take: 10,
         * })
         **/
        aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

        /**
         * Group by User.
         * Note, that providing `undefined` is treated as the value not being there.
         * Read more here: https://pris.ly/d/null-undefined
         * @param {UserGroupByArgs} args - Group by arguments.
         * @example
         * // Group by city, order by createdAt, get count
         * const result = await prisma.user.groupBy({
         *   by: ['city', 'createdAt'],
         *   orderBy: {
         *     createdAt: true
         *   },
         *   _count: {
         *     _all: true
         *   },
         * })
         *
         **/
        groupBy<
            T extends UserGroupByArgs,
            HasSelectOrTake extends Or<
                Extends<'skip', Keys<T>>,
                Extends<'take', Keys<T>>
            >,
            OrderByArg extends True extends HasSelectOrTake
                ? { orderBy: UserGroupByArgs['orderBy'] }
                : { orderBy?: UserGroupByArgs['orderBy'] },
            OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
            ByFields extends MaybeTupleToUnion<T['by']>,
            ByValid extends Has<ByFields, OrderFields>,
            HavingFields extends GetHavingFields<T['having']>,
            HavingValid extends Has<ByFields, HavingFields>,
            ByEmpty extends T['by'] extends never[] ? True : False,
            InputErrors extends ByEmpty extends True
                ? `Error: "by" must not be empty.`
                : HavingValid extends False
                    ? {
                        [P in HavingFields]: P extends ByFields
                            ? never
                            : P extends string
                                ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                                : [
                                    Error,
                                    'Field ',
                                    P,
                                    ` in "having" needs to be provided in "by"`,
                                ]
                    }[HavingFields]
                    : 'take' extends Keys<T>
                        ? 'orderBy' extends Keys<T>
                            ? ByValid extends True
                                ? {}
                                : {
                                    [P in OrderFields]: P extends ByFields
                                        ? never
                                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                                }[OrderFields]
                            : 'Error: If you provide "take", you also need to provide "orderBy"'
                        : 'skip' extends Keys<T>
                            ? 'orderBy' extends Keys<T>
                                ? ByValid extends True
                                    ? {}
                                    : {
                                        [P in OrderFields]: P extends ByFields
                                            ? never
                                            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                                    }[OrderFields]
                                : 'Error: If you provide "skip", you also need to provide "orderBy"'
                            : ByValid extends True
                                ? {}
                                : {
                                    [P in OrderFields]: P extends ByFields
                                        ? never
                                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
                                }[OrderFields]
        >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
    }

    /**
     * The delegate class that acts as a "Promise-like" for User.
     * Why is this prefixed with `Prisma__`?
     * Because we want to prevent naming conflicts as mentioned in
     * https://github.com/prisma/prisma-client-js/issues/707
     */
    export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
        readonly [Symbol.toStringTag]: "PrismaPromise"

        /**
         * Attaches callbacks for the resolution and/or rejection of the Promise.
         * @param onfulfilled The callback to execute when the Promise is resolved.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of which ever callback is executed.
         */
        then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>

        /**
         * Attaches a callback for only the rejection of the Promise.
         * @param onrejected The callback to execute when the Promise is rejected.
         * @returns A Promise for the completion of the callback.
         */
        catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>

        /**
         * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
         * resolved value cannot be modified from the callback.
         * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
         * @returns A Promise for the completion of the callback.
         */
        finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>
    }


    /**
     * Fields of the User model
     */
    export interface UserFieldRefs {
        readonly id: FieldRef<"User", 'Int'>
        readonly username: FieldRef<"User", 'String'>
        readonly email: FieldRef<"User", 'String'>
    }


    // Custom InputTypes
    /**
     * User findUnique
     */
    export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the User
         */
        select?: UserSelect<ExtArgs> | null
        /**
         * Omit specific fields from the User
         */
        omit?: UserOmit<ExtArgs> | null
        /**
         * Filter, which User to fetch.
         */
        where: UserWhereUniqueInput
    }

    /**
     * User findUniqueOrThrow
     */
    export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the User
         */
        select?: UserSelect<ExtArgs> | null
        /**
         * Omit specific fields from the User
         */
        omit?: UserOmit<ExtArgs> | null
        /**
         * Filter, which User to fetch.
         */
        where: UserWhereUniqueInput
    }

    /**
     * User findFirst
     */
    export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the User
         */
        select?: UserSelect<ExtArgs> | null
        /**
         * Omit specific fields from the User
         */
        omit?: UserOmit<ExtArgs> | null
        /**
         * Filter, which User to fetch.
         */
        where?: UserWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Users to fetch.
         */
        orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for Users.
         */
        cursor?: UserWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Users from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Users.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of Users.
         */
        distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    }

    /**
     * User findFirstOrThrow
     */
    export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the User
         */
        select?: UserSelect<ExtArgs> | null
        /**
         * Omit specific fields from the User
         */
        omit?: UserOmit<ExtArgs> | null
        /**
         * Filter, which User to fetch.
         */
        where?: UserWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Users to fetch.
         */
        orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for searching for Users.
         */
        cursor?: UserWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Users from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Users.
         */
        skip?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
         *
         * Filter by unique combinations of Users.
         */
        distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    }

    /**
     * User findMany
     */
    export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the User
         */
        select?: UserSelect<ExtArgs> | null
        /**
         * Omit specific fields from the User
         */
        omit?: UserOmit<ExtArgs> | null
        /**
         * Filter, which Users to fetch.
         */
        where?: UserWhereInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
         *
         * Determine the order of Users to fetch.
         */
        orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
         *
         * Sets the position for listing Users.
         */
        cursor?: UserWhereUniqueInput
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Take `±n` Users from the position of the cursor.
         */
        take?: number
        /**
         * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
         *
         * Skip the first `n` Users.
         */
        skip?: number
        distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    }

    /**
     * User create
     */
    export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the User
         */
        select?: UserSelect<ExtArgs> | null
        /**
         * Omit specific fields from the User
         */
        omit?: UserOmit<ExtArgs> | null
        /**
         * The data needed to create a User.
         */
        data: XOR<UserCreateInput, UserUncheckedCreateInput>
    }

    /**
     * User createMany
     */
    export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * The data used to create many Users.
         */
        data: UserCreateManyInput | UserCreateManyInput[]
    }

    /**
     * User createManyAndReturn
     */
    export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the User
         */
        select?: UserSelectCreateManyAndReturn<ExtArgs> | null
        /**
         * Omit specific fields from the User
         */
        omit?: UserOmit<ExtArgs> | null
        /**
         * The data used to create many Users.
         */
        data: UserCreateManyInput | UserCreateManyInput[]
    }

    /**
     * User update
     */
    export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the User
         */
        select?: UserSelect<ExtArgs> | null
        /**
         * Omit specific fields from the User
         */
        omit?: UserOmit<ExtArgs> | null
        /**
         * The data needed to update a User.
         */
        data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
        /**
         * Choose, which User to update.
         */
        where: UserWhereUniqueInput
    }

    /**
     * User updateMany
     */
    export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * The data used to update Users.
         */
        data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
        /**
         * Filter which Users to update
         */
        where?: UserWhereInput
        /**
         * Limit how many Users to update.
         */
        limit?: number
    }

    /**
     * User updateManyAndReturn
     */
    export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the User
         */
        select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
        /**
         * Omit specific fields from the User
         */
        omit?: UserOmit<ExtArgs> | null
        /**
         * The data used to update Users.
         */
        data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
        /**
         * Filter which Users to update
         */
        where?: UserWhereInput
        /**
         * Limit how many Users to update.
         */
        limit?: number
    }

    /**
     * User upsert
     */
    export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the User
         */
        select?: UserSelect<ExtArgs> | null
        /**
         * Omit specific fields from the User
         */
        omit?: UserOmit<ExtArgs> | null
        /**
         * The filter to search for the User to update in case it exists.
         */
        where: UserWhereUniqueInput
        /**
         * In case the User found by the `where` argument doesn't exist, create a new User with this data.
         */
        create: XOR<UserCreateInput, UserUncheckedCreateInput>
        /**
         * In case the User was found with the provided `where` argument, update it with this data.
         */
        update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    }

    /**
     * User delete
     */
    export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the User
         */
        select?: UserSelect<ExtArgs> | null
        /**
         * Omit specific fields from the User
         */
        omit?: UserOmit<ExtArgs> | null
        /**
         * Filter which User to delete.
         */
        where: UserWhereUniqueInput
    }

    /**
     * User deleteMany
     */
    export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Filter which Users to delete
         */
        where?: UserWhereInput
        /**
         * Limit how many Users to delete.
         */
        limit?: number
    }

    /**
     * User without action
     */
    export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
        /**
         * Select specific fields to fetch from the User
         */
        select?: UserSelect<ExtArgs> | null
        /**
         * Omit specific fields from the User
         */
        omit?: UserOmit<ExtArgs> | null
    }


    /**
     * Enums
     */

    export const TransactionIsolationLevel = runtime.makeStrictEnum({
        Serializable: 'Serializable'
    } as const)

    export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


    export const ConfigTableScalarFieldEnum = {
        id: 'id',
        name: 'name',
        title: 'title',
        description: 'description',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    } as const

    export type ConfigTableScalarFieldEnum = (typeof ConfigTableScalarFieldEnum)[keyof typeof ConfigTableScalarFieldEnum]


    export const ConfigColumnScalarFieldEnum = {
        id: 'id',
        name: 'name',
        title: 'title',
        desc: 'desc',
        tableId: 'tableId',
        dataType: 'dataType',
        dataIndex: 'dataIndex',
        isShow: 'isShow',
        isEdit: 'isEdit',
        order: 'order'
    } as const

    export type ConfigColumnScalarFieldEnum = (typeof ConfigColumnScalarFieldEnum)[keyof typeof ConfigColumnScalarFieldEnum]


    export const UserScalarFieldEnum = {
        id: 'id',
        username: 'username',
        email: 'email'
    } as const

    export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


    export const SortOrder = {
        asc: 'asc',
        desc: 'desc'
    } as const

    export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


    export const NullsOrder = {
        first: 'first',
        last: 'last'
    } as const

    export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


    /**
     * Field references
     */


    /**
     * Reference to a field of type 'Int'
     */
    export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>


    /**
     * Reference to a field of type 'String'
     */
    export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>


    /**
     * Reference to a field of type 'DateTime'
     */
    export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>


    /**
     * Reference to a field of type 'Boolean'
     */
    export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>


    /**
     * Reference to a field of type 'Float'
     */
    export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>

    /**
     * Deep Input Types
     */


    export type ConfigTableWhereInput = {
        AND?: ConfigTableWhereInput | ConfigTableWhereInput[]
        OR?: ConfigTableWhereInput[]
        NOT?: ConfigTableWhereInput | ConfigTableWhereInput[]
        id?: IntFilter<"ConfigTable"> | number
        name?: StringFilter<"ConfigTable"> | string
        title?: StringFilter<"ConfigTable"> | string
        description?: StringFilter<"ConfigTable"> | string
        createdAt?: DateTimeFilter<"ConfigTable"> | Date | string
        updatedAt?: DateTimeFilter<"ConfigTable"> | Date | string
    }

    export type ConfigTableOrderByWithRelationInput = {
        id?: SortOrder
        name?: SortOrder
        title?: SortOrder
        description?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
    }

    export type ConfigTableWhereUniqueInput = Prisma.AtLeast<{
        id?: number
        name?: string
        AND?: ConfigTableWhereInput | ConfigTableWhereInput[]
        OR?: ConfigTableWhereInput[]
        NOT?: ConfigTableWhereInput | ConfigTableWhereInput[]
        title?: StringFilter<"ConfigTable"> | string
        description?: StringFilter<"ConfigTable"> | string
        createdAt?: DateTimeFilter<"ConfigTable"> | Date | string
        updatedAt?: DateTimeFilter<"ConfigTable"> | Date | string
    }, "id" | "name">

    export type ConfigTableOrderByWithAggregationInput = {
        id?: SortOrder
        name?: SortOrder
        title?: SortOrder
        description?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
        _count?: ConfigTableCountOrderByAggregateInput
        _avg?: ConfigTableAvgOrderByAggregateInput
        _max?: ConfigTableMaxOrderByAggregateInput
        _min?: ConfigTableMinOrderByAggregateInput
        _sum?: ConfigTableSumOrderByAggregateInput
    }

    export type ConfigTableScalarWhereWithAggregatesInput = {
        AND?: ConfigTableScalarWhereWithAggregatesInput | ConfigTableScalarWhereWithAggregatesInput[]
        OR?: ConfigTableScalarWhereWithAggregatesInput[]
        NOT?: ConfigTableScalarWhereWithAggregatesInput | ConfigTableScalarWhereWithAggregatesInput[]
        id?: IntWithAggregatesFilter<"ConfigTable"> | number
        name?: StringWithAggregatesFilter<"ConfigTable"> | string
        title?: StringWithAggregatesFilter<"ConfigTable"> | string
        description?: StringWithAggregatesFilter<"ConfigTable"> | string
        createdAt?: DateTimeWithAggregatesFilter<"ConfigTable"> | Date | string
        updatedAt?: DateTimeWithAggregatesFilter<"ConfigTable"> | Date | string
    }

    export type ConfigColumnWhereInput = {
        AND?: ConfigColumnWhereInput | ConfigColumnWhereInput[]
        OR?: ConfigColumnWhereInput[]
        NOT?: ConfigColumnWhereInput | ConfigColumnWhereInput[]
        id?: IntFilter<"ConfigColumn"> | number
        name?: StringFilter<"ConfigColumn"> | string
        title?: StringFilter<"ConfigColumn"> | string
        desc?: StringFilter<"ConfigColumn"> | string
        tableId?: IntFilter<"ConfigColumn"> | number
        dataType?: StringFilter<"ConfigColumn"> | string
        dataIndex?: StringFilter<"ConfigColumn"> | string
        isShow?: BoolFilter<"ConfigColumn"> | boolean
        isEdit?: BoolFilter<"ConfigColumn"> | boolean
        order?: IntFilter<"ConfigColumn"> | number
    }

    export type ConfigColumnOrderByWithRelationInput = {
        id?: SortOrder
        name?: SortOrder
        title?: SortOrder
        desc?: SortOrder
        tableId?: SortOrder
        dataType?: SortOrder
        dataIndex?: SortOrder
        isShow?: SortOrder
        isEdit?: SortOrder
        order?: SortOrder
    }

    export type ConfigColumnWhereUniqueInput = Prisma.AtLeast<{
        id?: number
        AND?: ConfigColumnWhereInput | ConfigColumnWhereInput[]
        OR?: ConfigColumnWhereInput[]
        NOT?: ConfigColumnWhereInput | ConfigColumnWhereInput[]
        name?: StringFilter<"ConfigColumn"> | string
        title?: StringFilter<"ConfigColumn"> | string
        desc?: StringFilter<"ConfigColumn"> | string
        tableId?: IntFilter<"ConfigColumn"> | number
        dataType?: StringFilter<"ConfigColumn"> | string
        dataIndex?: StringFilter<"ConfigColumn"> | string
        isShow?: BoolFilter<"ConfigColumn"> | boolean
        isEdit?: BoolFilter<"ConfigColumn"> | boolean
        order?: IntFilter<"ConfigColumn"> | number
    }, "id">

    export type ConfigColumnOrderByWithAggregationInput = {
        id?: SortOrder
        name?: SortOrder
        title?: SortOrder
        desc?: SortOrder
        tableId?: SortOrder
        dataType?: SortOrder
        dataIndex?: SortOrder
        isShow?: SortOrder
        isEdit?: SortOrder
        order?: SortOrder
        _count?: ConfigColumnCountOrderByAggregateInput
        _avg?: ConfigColumnAvgOrderByAggregateInput
        _max?: ConfigColumnMaxOrderByAggregateInput
        _min?: ConfigColumnMinOrderByAggregateInput
        _sum?: ConfigColumnSumOrderByAggregateInput
    }

    export type ConfigColumnScalarWhereWithAggregatesInput = {
        AND?: ConfigColumnScalarWhereWithAggregatesInput | ConfigColumnScalarWhereWithAggregatesInput[]
        OR?: ConfigColumnScalarWhereWithAggregatesInput[]
        NOT?: ConfigColumnScalarWhereWithAggregatesInput | ConfigColumnScalarWhereWithAggregatesInput[]
        id?: IntWithAggregatesFilter<"ConfigColumn"> | number
        name?: StringWithAggregatesFilter<"ConfigColumn"> | string
        title?: StringWithAggregatesFilter<"ConfigColumn"> | string
        desc?: StringWithAggregatesFilter<"ConfigColumn"> | string
        tableId?: IntWithAggregatesFilter<"ConfigColumn"> | number
        dataType?: StringWithAggregatesFilter<"ConfigColumn"> | string
        dataIndex?: StringWithAggregatesFilter<"ConfigColumn"> | string
        isShow?: BoolWithAggregatesFilter<"ConfigColumn"> | boolean
        isEdit?: BoolWithAggregatesFilter<"ConfigColumn"> | boolean
        order?: IntWithAggregatesFilter<"ConfigColumn"> | number
    }

    export type UserWhereInput = {
        AND?: UserWhereInput | UserWhereInput[]
        OR?: UserWhereInput[]
        NOT?: UserWhereInput | UserWhereInput[]
        id?: IntFilter<"User"> | number
        username?: StringFilter<"User"> | string
        email?: StringNullableFilter<"User"> | string | null
    }

    export type UserOrderByWithRelationInput = {
        id?: SortOrder
        username?: SortOrder
        email?: SortOrderInput | SortOrder
    }

    export type UserWhereUniqueInput = Prisma.AtLeast<{
        id?: number
        email?: string
        AND?: UserWhereInput | UserWhereInput[]
        OR?: UserWhereInput[]
        NOT?: UserWhereInput | UserWhereInput[]
        username?: StringFilter<"User"> | string
    }, "id" | "email">

    export type UserOrderByWithAggregationInput = {
        id?: SortOrder
        username?: SortOrder
        email?: SortOrderInput | SortOrder
        _count?: UserCountOrderByAggregateInput
        _avg?: UserAvgOrderByAggregateInput
        _max?: UserMaxOrderByAggregateInput
        _min?: UserMinOrderByAggregateInput
        _sum?: UserSumOrderByAggregateInput
    }

    export type UserScalarWhereWithAggregatesInput = {
        AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
        OR?: UserScalarWhereWithAggregatesInput[]
        NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
        id?: IntWithAggregatesFilter<"User"> | number
        username?: StringWithAggregatesFilter<"User"> | string
        email?: StringNullableWithAggregatesFilter<"User"> | string | null
    }

    export type ConfigTableCreateInput = {
        name: string
        title: string
        description?: string
        createdAt?: Date | string
        updatedAt?: Date | string
    }

    export type ConfigTableUncheckedCreateInput = {
        id?: number
        name: string
        title: string
        description?: string
        createdAt?: Date | string
        updatedAt?: Date | string
    }

    export type ConfigTableUpdateInput = {
        name?: StringFieldUpdateOperationsInput | string
        title?: StringFieldUpdateOperationsInput | string
        description?: StringFieldUpdateOperationsInput | string
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    }

    export type ConfigTableUncheckedUpdateInput = {
        id?: IntFieldUpdateOperationsInput | number
        name?: StringFieldUpdateOperationsInput | string
        title?: StringFieldUpdateOperationsInput | string
        description?: StringFieldUpdateOperationsInput | string
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    }

    export type ConfigTableCreateManyInput = {
        id?: number
        name: string
        title: string
        description?: string
        createdAt?: Date | string
        updatedAt?: Date | string
    }

    export type ConfigTableUpdateManyMutationInput = {
        name?: StringFieldUpdateOperationsInput | string
        title?: StringFieldUpdateOperationsInput | string
        description?: StringFieldUpdateOperationsInput | string
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    }

    export type ConfigTableUncheckedUpdateManyInput = {
        id?: IntFieldUpdateOperationsInput | number
        name?: StringFieldUpdateOperationsInput | string
        title?: StringFieldUpdateOperationsInput | string
        description?: StringFieldUpdateOperationsInput | string
        createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
        updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    }

    export type ConfigColumnCreateInput = {
        name: string
        title: string
        desc?: string
        tableId: number
        dataType: string
        dataIndex: string
        isShow?: boolean
        isEdit?: boolean
        order?: number
    }

    export type ConfigColumnUncheckedCreateInput = {
        id?: number
        name: string
        title: string
        desc?: string
        tableId: number
        dataType: string
        dataIndex: string
        isShow?: boolean
        isEdit?: boolean
        order?: number
    }

    export type ConfigColumnUpdateInput = {
        name?: StringFieldUpdateOperationsInput | string
        title?: StringFieldUpdateOperationsInput | string
        desc?: StringFieldUpdateOperationsInput | string
        tableId?: IntFieldUpdateOperationsInput | number
        dataType?: StringFieldUpdateOperationsInput | string
        dataIndex?: StringFieldUpdateOperationsInput | string
        isShow?: BoolFieldUpdateOperationsInput | boolean
        isEdit?: BoolFieldUpdateOperationsInput | boolean
        order?: IntFieldUpdateOperationsInput | number
    }

    export type ConfigColumnUncheckedUpdateInput = {
        id?: IntFieldUpdateOperationsInput | number
        name?: StringFieldUpdateOperationsInput | string
        title?: StringFieldUpdateOperationsInput | string
        desc?: StringFieldUpdateOperationsInput | string
        tableId?: IntFieldUpdateOperationsInput | number
        dataType?: StringFieldUpdateOperationsInput | string
        dataIndex?: StringFieldUpdateOperationsInput | string
        isShow?: BoolFieldUpdateOperationsInput | boolean
        isEdit?: BoolFieldUpdateOperationsInput | boolean
        order?: IntFieldUpdateOperationsInput | number
    }

    export type ConfigColumnCreateManyInput = {
        id?: number
        name: string
        title: string
        desc?: string
        tableId: number
        dataType: string
        dataIndex: string
        isShow?: boolean
        isEdit?: boolean
        order?: number
    }

    export type ConfigColumnUpdateManyMutationInput = {
        name?: StringFieldUpdateOperationsInput | string
        title?: StringFieldUpdateOperationsInput | string
        desc?: StringFieldUpdateOperationsInput | string
        tableId?: IntFieldUpdateOperationsInput | number
        dataType?: StringFieldUpdateOperationsInput | string
        dataIndex?: StringFieldUpdateOperationsInput | string
        isShow?: BoolFieldUpdateOperationsInput | boolean
        isEdit?: BoolFieldUpdateOperationsInput | boolean
        order?: IntFieldUpdateOperationsInput | number
    }

    export type ConfigColumnUncheckedUpdateManyInput = {
        id?: IntFieldUpdateOperationsInput | number
        name?: StringFieldUpdateOperationsInput | string
        title?: StringFieldUpdateOperationsInput | string
        desc?: StringFieldUpdateOperationsInput | string
        tableId?: IntFieldUpdateOperationsInput | number
        dataType?: StringFieldUpdateOperationsInput | string
        dataIndex?: StringFieldUpdateOperationsInput | string
        isShow?: BoolFieldUpdateOperationsInput | boolean
        isEdit?: BoolFieldUpdateOperationsInput | boolean
        order?: IntFieldUpdateOperationsInput | number
    }

    export type UserCreateInput = {
        username: string
        email?: string | null
    }

    export type UserUncheckedCreateInput = {
        id?: number
        username: string
        email?: string | null
    }

    export type UserUpdateInput = {
        username?: StringFieldUpdateOperationsInput | string
        email?: NullableStringFieldUpdateOperationsInput | string | null
    }

    export type UserUncheckedUpdateInput = {
        id?: IntFieldUpdateOperationsInput | number
        username?: StringFieldUpdateOperationsInput | string
        email?: NullableStringFieldUpdateOperationsInput | string | null
    }

    export type UserCreateManyInput = {
        id?: number
        username: string
        email?: string | null
    }

    export type UserUpdateManyMutationInput = {
        username?: StringFieldUpdateOperationsInput | string
        email?: NullableStringFieldUpdateOperationsInput | string | null
    }

    export type UserUncheckedUpdateManyInput = {
        id?: IntFieldUpdateOperationsInput | number
        username?: StringFieldUpdateOperationsInput | string
        email?: NullableStringFieldUpdateOperationsInput | string | null
    }

    export type IntFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel>
        in?: number[]
        notIn?: number[]
        lt?: number | IntFieldRefInput<$PrismaModel>
        lte?: number | IntFieldRefInput<$PrismaModel>
        gt?: number | IntFieldRefInput<$PrismaModel>
        gte?: number | IntFieldRefInput<$PrismaModel>
        not?: NestedIntFilter<$PrismaModel> | number
    }

    export type StringFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>
        in?: string[]
        notIn?: string[]
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        not?: NestedStringFilter<$PrismaModel> | string
    }

    export type DateTimeFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        in?: Date[] | string[]
        notIn?: Date[] | string[]
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        not?: NestedDateTimeFilter<$PrismaModel> | Date | string
    }

    export type ConfigTableCountOrderByAggregateInput = {
        id?: SortOrder
        name?: SortOrder
        title?: SortOrder
        description?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
    }

    export type ConfigTableAvgOrderByAggregateInput = {
        id?: SortOrder
    }

    export type ConfigTableMaxOrderByAggregateInput = {
        id?: SortOrder
        name?: SortOrder
        title?: SortOrder
        description?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
    }

    export type ConfigTableMinOrderByAggregateInput = {
        id?: SortOrder
        name?: SortOrder
        title?: SortOrder
        description?: SortOrder
        createdAt?: SortOrder
        updatedAt?: SortOrder
    }

    export type ConfigTableSumOrderByAggregateInput = {
        id?: SortOrder
    }

    export type IntWithAggregatesFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel>
        in?: number[]
        notIn?: number[]
        lt?: number | IntFieldRefInput<$PrismaModel>
        lte?: number | IntFieldRefInput<$PrismaModel>
        gt?: number | IntFieldRefInput<$PrismaModel>
        gte?: number | IntFieldRefInput<$PrismaModel>
        not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
        _count?: NestedIntFilter<$PrismaModel>
        _avg?: NestedFloatFilter<$PrismaModel>
        _sum?: NestedIntFilter<$PrismaModel>
        _min?: NestedIntFilter<$PrismaModel>
        _max?: NestedIntFilter<$PrismaModel>
    }

    export type StringWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>
        in?: string[]
        notIn?: string[]
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
        _count?: NestedIntFilter<$PrismaModel>
        _min?: NestedStringFilter<$PrismaModel>
        _max?: NestedStringFilter<$PrismaModel>
    }

    export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        in?: Date[] | string[]
        notIn?: Date[] | string[]
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
        _count?: NestedIntFilter<$PrismaModel>
        _min?: NestedDateTimeFilter<$PrismaModel>
        _max?: NestedDateTimeFilter<$PrismaModel>
    }

    export type BoolFilter<$PrismaModel = never> = {
        equals?: boolean | BooleanFieldRefInput<$PrismaModel>
        not?: NestedBoolFilter<$PrismaModel> | boolean
    }

    export type ConfigColumnCountOrderByAggregateInput = {
        id?: SortOrder
        name?: SortOrder
        title?: SortOrder
        desc?: SortOrder
        tableId?: SortOrder
        dataType?: SortOrder
        dataIndex?: SortOrder
        isShow?: SortOrder
        isEdit?: SortOrder
        order?: SortOrder
    }

    export type ConfigColumnAvgOrderByAggregateInput = {
        id?: SortOrder
        tableId?: SortOrder
        order?: SortOrder
    }

    export type ConfigColumnMaxOrderByAggregateInput = {
        id?: SortOrder
        name?: SortOrder
        title?: SortOrder
        desc?: SortOrder
        tableId?: SortOrder
        dataType?: SortOrder
        dataIndex?: SortOrder
        isShow?: SortOrder
        isEdit?: SortOrder
        order?: SortOrder
    }

    export type ConfigColumnMinOrderByAggregateInput = {
        id?: SortOrder
        name?: SortOrder
        title?: SortOrder
        desc?: SortOrder
        tableId?: SortOrder
        dataType?: SortOrder
        dataIndex?: SortOrder
        isShow?: SortOrder
        isEdit?: SortOrder
        order?: SortOrder
    }

    export type ConfigColumnSumOrderByAggregateInput = {
        id?: SortOrder
        tableId?: SortOrder
        order?: SortOrder
    }

    export type BoolWithAggregatesFilter<$PrismaModel = never> = {
        equals?: boolean | BooleanFieldRefInput<$PrismaModel>
        not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
        _count?: NestedIntFilter<$PrismaModel>
        _min?: NestedBoolFilter<$PrismaModel>
        _max?: NestedBoolFilter<$PrismaModel>
    }

    export type StringNullableFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null
        in?: string[] | null
        notIn?: string[] | null
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        not?: NestedStringNullableFilter<$PrismaModel> | string | null
    }

    export type SortOrderInput = {
        sort: SortOrder
        nulls?: NullsOrder
    }

    export type UserCountOrderByAggregateInput = {
        id?: SortOrder
        username?: SortOrder
        email?: SortOrder
    }

    export type UserAvgOrderByAggregateInput = {
        id?: SortOrder
    }

    export type UserMaxOrderByAggregateInput = {
        id?: SortOrder
        username?: SortOrder
        email?: SortOrder
    }

    export type UserMinOrderByAggregateInput = {
        id?: SortOrder
        username?: SortOrder
        email?: SortOrder
    }

    export type UserSumOrderByAggregateInput = {
        id?: SortOrder
    }

    export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null
        in?: string[] | null
        notIn?: string[] | null
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
        _count?: NestedIntNullableFilter<$PrismaModel>
        _min?: NestedStringNullableFilter<$PrismaModel>
        _max?: NestedStringNullableFilter<$PrismaModel>
    }

    export type StringFieldUpdateOperationsInput = {
        set?: string
    }

    export type DateTimeFieldUpdateOperationsInput = {
        set?: Date | string
    }

    export type IntFieldUpdateOperationsInput = {
        set?: number
        increment?: number
        decrement?: number
        multiply?: number
        divide?: number
    }

    export type BoolFieldUpdateOperationsInput = {
        set?: boolean
    }

    export type NullableStringFieldUpdateOperationsInput = {
        set?: string | null
    }

    export type NestedIntFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel>
        in?: number[]
        notIn?: number[]
        lt?: number | IntFieldRefInput<$PrismaModel>
        lte?: number | IntFieldRefInput<$PrismaModel>
        gt?: number | IntFieldRefInput<$PrismaModel>
        gte?: number | IntFieldRefInput<$PrismaModel>
        not?: NestedIntFilter<$PrismaModel> | number
    }

    export type NestedStringFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>
        in?: string[]
        notIn?: string[]
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        not?: NestedStringFilter<$PrismaModel> | string
    }

    export type NestedDateTimeFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        in?: Date[] | string[]
        notIn?: Date[] | string[]
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        not?: NestedDateTimeFilter<$PrismaModel> | Date | string
    }

    export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel>
        in?: number[]
        notIn?: number[]
        lt?: number | IntFieldRefInput<$PrismaModel>
        lte?: number | IntFieldRefInput<$PrismaModel>
        gt?: number | IntFieldRefInput<$PrismaModel>
        gte?: number | IntFieldRefInput<$PrismaModel>
        not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
        _count?: NestedIntFilter<$PrismaModel>
        _avg?: NestedFloatFilter<$PrismaModel>
        _sum?: NestedIntFilter<$PrismaModel>
        _min?: NestedIntFilter<$PrismaModel>
        _max?: NestedIntFilter<$PrismaModel>
    }

    export type NestedFloatFilter<$PrismaModel = never> = {
        equals?: number | FloatFieldRefInput<$PrismaModel>
        in?: number[]
        notIn?: number[]
        lt?: number | FloatFieldRefInput<$PrismaModel>
        lte?: number | FloatFieldRefInput<$PrismaModel>
        gt?: number | FloatFieldRefInput<$PrismaModel>
        gte?: number | FloatFieldRefInput<$PrismaModel>
        not?: NestedFloatFilter<$PrismaModel> | number
    }

    export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel>
        in?: string[]
        notIn?: string[]
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
        _count?: NestedIntFilter<$PrismaModel>
        _min?: NestedStringFilter<$PrismaModel>
        _max?: NestedStringFilter<$PrismaModel>
    }

    export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
        equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        in?: Date[] | string[]
        notIn?: Date[] | string[]
        lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
        not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
        _count?: NestedIntFilter<$PrismaModel>
        _min?: NestedDateTimeFilter<$PrismaModel>
        _max?: NestedDateTimeFilter<$PrismaModel>
    }

    export type NestedBoolFilter<$PrismaModel = never> = {
        equals?: boolean | BooleanFieldRefInput<$PrismaModel>
        not?: NestedBoolFilter<$PrismaModel> | boolean
    }

    export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
        equals?: boolean | BooleanFieldRefInput<$PrismaModel>
        not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
        _count?: NestedIntFilter<$PrismaModel>
        _min?: NestedBoolFilter<$PrismaModel>
        _max?: NestedBoolFilter<$PrismaModel>
    }

    export type NestedStringNullableFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null
        in?: string[] | null
        notIn?: string[] | null
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        not?: NestedStringNullableFilter<$PrismaModel> | string | null
    }

    export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
        equals?: string | StringFieldRefInput<$PrismaModel> | null
        in?: string[] | null
        notIn?: string[] | null
        lt?: string | StringFieldRefInput<$PrismaModel>
        lte?: string | StringFieldRefInput<$PrismaModel>
        gt?: string | StringFieldRefInput<$PrismaModel>
        gte?: string | StringFieldRefInput<$PrismaModel>
        contains?: string | StringFieldRefInput<$PrismaModel>
        startsWith?: string | StringFieldRefInput<$PrismaModel>
        endsWith?: string | StringFieldRefInput<$PrismaModel>
        not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
        _count?: NestedIntNullableFilter<$PrismaModel>
        _min?: NestedStringNullableFilter<$PrismaModel>
        _max?: NestedStringNullableFilter<$PrismaModel>
    }

    export type NestedIntNullableFilter<$PrismaModel = never> = {
        equals?: number | IntFieldRefInput<$PrismaModel> | null
        in?: number[] | null
        notIn?: number[] | null
        lt?: number | IntFieldRefInput<$PrismaModel>
        lte?: number | IntFieldRefInput<$PrismaModel>
        gt?: number | IntFieldRefInput<$PrismaModel>
        gte?: number | IntFieldRefInput<$PrismaModel>
        not?: NestedIntNullableFilter<$PrismaModel> | number | null
    }


    /**
     * Batch Payload for updateMany & deleteMany & createMany
     */

    export type BatchPayload = {
        count: number
    }
}