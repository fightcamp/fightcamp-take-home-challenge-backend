import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connectToDatabase } from './utils/database';
import { config } from './utils/config';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { schema } from './composeSchema';

(async () => {
  await connectToDatabase();

  const server = new ApolloServer({ schema: makeExecutableSchema(schema) });

  const { url } = await startStandaloneServer(server, {
    listen: { port: config.PORT },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
})();