import 'reflect-metadata';
import ProgramEnv from "./env.loader.ts";
import {LOGGER, server} from "./server.ts";

const port = ProgramEnv.server.port
await server.listen({port})
LOGGER.info(`Server started on port: ${port}`);