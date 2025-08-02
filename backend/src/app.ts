import 'reflect-metadata';
import ProgramEnv from "./env.ts";
import {LOGGER, server} from "./server.ts";
import path from "node:path";
import {PrismaClient} from "./prisma/index.js";

const dbFile = ProgramEnv?.database?.url ?? path.join(process.cwd(), "file:./database/db.sqlite");
export const prisma = new PrismaClient({
    datasourceUrl: `${dbFile}`,
})

const port = ProgramEnv?.server?.port ?? 3000;
await server.listen({port})

LOGGER.info(`Server started on port: ${port}`);