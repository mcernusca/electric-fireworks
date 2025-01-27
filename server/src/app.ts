import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import { typeDefs, resolvers } from './graphql'

const app = express()
const httpServer = http.createServer(app)

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

async function start() {
  await server.start()
  app.use(cors(), bodyParser.json(), expressMiddleware(server))
  httpServer.listen({ port: 8002 })
  console.log(`🚀 Wordle server ready at http://localhost:8002`)
}

start()
