const queryDefs = `#graphql
  type Query {
    hello: String!
  }
`

export const typeDefs = [queryDefs]

export const resolvers = {
  Query: {
    hello: () => `Hello World! ${new Date().getTime()}`,
  },
}
