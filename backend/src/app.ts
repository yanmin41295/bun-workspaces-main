import 'reflect-metadata';
import {LOGGER, server} from "./server.ts";
import {Container} from "@mono/common/src/api/container.js";
// 导入用户路由
import './routes/user.router.ts';
import ProgramEnv from "./env.js";

const container = new Container();
await container.load('./src/controller');

await server.listen({port: ProgramEnv.server.port})
LOGGER.info(`Server started on port: ${ProgramEnv.server.port}`);