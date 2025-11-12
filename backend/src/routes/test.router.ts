import {FastifyPluginAsync} from "fastify";

/**
 * 测试路由 路由类型标注
 * interface RouteGenericInterface {
 *   Params?: unknown;       // 路径参数类型（如 /users/:id 中的 id）
 *   Querystring?: unknown;  // 查询参数类型（如 ?page=1&size=10）
 *   Body?: unknown;         // 请求体类型（POST/PUT 等方法的 body）
 *   Headers?: unknown;      // 请求头类型（如 Authorization、自定义头）
 *   Reply?: unknown;        // 响应体类型（返回值类型）
 * }
 *
 * 参数获取
 * request.params：路径参数（如 /users/:id 中的 id）
 * request.query：查询参数（如 ?page=1&size=10）
 * request.headers：请求头（如 Authorization、Content-Type）
 * request.body：请求体（如 POST/PUT 提交的数据）
 * @param server
 */
const testRoutes: FastifyPluginAsync = async (server) => {
    server.get<{
        Params: { userId: string },
        Querystring: { time: string },
        Body: { username: string },
        Headers: { token: string; },
        Reply: { hello: string, date: string };
    }>('/hello/:userId', async (request, reply) => {
        return {
            hello: JSON.stringify({
                Params: request.params,
                Querystring: request.query,
                Body: request.body,
                Headers: request.headers,
            }),
            date: new Date().toLocaleString()
        }
    })

    server.get('/error', async (request, reply) => {
        throw new Error('test error')
    })
}

export default {router: testRoutes, prefix: '/test'};