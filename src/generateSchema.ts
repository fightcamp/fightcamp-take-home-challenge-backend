import { makeExecutableSchema } from '@graphql-tools/schema'
import { authorSchema } from './authors/authors.schema.graphql';
import { postSchema } from './posts/posts.schema.graphql';
import { authorResolvers } from './authors/authors.resolvers';
import { postResolvers } from './posts/posts.resolvers';
export const schema = makeExecutableSchema({
  typeDefs: [authorSchema, postSchema],
  resolvers: [authorResolvers, postResolvers],
});