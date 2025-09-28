import 'reflect-metadata';
import {LOGGER, server} from "./server.ts";
import envLoader from "./env/env.loader.js";
import {Container} from "@mono/common/src/api/container.js";

export const ProgramEnv = await envLoader.load()
const container = new Container();
await container.load('./src/controller');

await server.listen({port: ProgramEnv.server.port})
LOGGER.info(`Server started on port: ${ProgramEnv.server.port}`);