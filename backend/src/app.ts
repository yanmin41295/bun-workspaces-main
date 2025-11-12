import 'reflect-metadata';
import {LOGGER, server} from "./server.ts";
// 导入用户路由
import ProgramEnv from "./env.js";

await server.listen({port: ProgramEnv.server.port})
LOGGER.info(`Server started on port: ${ProgramEnv.server.port}`);