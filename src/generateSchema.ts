import 'graphql-import-node';
import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';

const typeDefs = loadFilesSync(path.join(__dirname, '..', '/**/*.graphql'));
const resolvers = loadFilesSync(path.join(__dirname, '..', '/**/*.resolvers.*'));

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});