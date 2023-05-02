import 'graphql-import-node';
import * as rootDefs from './schema/schema.graphql';
import { makeExecutableSchema } from '@graphql-tools/schema'
import resolvers from './resolvers/resolvers';

export const schema = makeExecutableSchema({
  typeDefs: [rootDefs],
  resolvers,
});