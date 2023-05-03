import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './generateSchema';
import { connectToDatabase } from './utils/database';
import { config } from './utils/config';

(async () => {
  await connectToDatabase();
  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: config.PORT },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
})();