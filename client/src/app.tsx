import styles from './app.module.scss'
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from '@apollo/client'
import React from 'react'

export const client = new ApolloClient({
  uri: 'http://localhost:8002',
  cache: new InMemoryCache(),
})

const HELLO_QUERY = gql(`
  query Hello {
    hello
  } 
`)

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Hello />
    </ApolloProvider>
  )
}

const Hello: React.FC = () => {
  const query = useQuery<{ hello: string }, {}>(HELLO_QUERY)
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Wordle Boilerplate</h1>
        <p>
          This is the boilerplate app for the Wordle challenge. Please find full
          instructions in the README.md located at the root of the project
          directory.
        </p>
        <p>
          Use the button below to test your round-trip connection to the server.
        </p>
        <button className={styles.button} onClick={() => query.refetch()}>
          Refetch
        </button>
        <div className={styles.result}>Result: {query.data?.hello}</div>
      </div>
    </div>
  )
}

export { App }
