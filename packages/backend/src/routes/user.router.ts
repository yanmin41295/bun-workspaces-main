import {FastifyPluginAsync} from "fastify";

const userRoutes: FastifyPluginAsync = async (server) => {
    server.get<{ Params: { userId: string } }>('/user', {}, async (request, reply) => {
        request.params.userId
        return {
            hello: "world",
            date: new Date().toLocaleString()
        }
    })
}

export default {router: userRoutes, prefix: '/user'}