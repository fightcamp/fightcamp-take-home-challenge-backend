import { authorSchema } from './authors/authors.schema.graphql';
import { postSchema } from './posts/posts.schema.graphql';
import { authorResolvers } from './authors/authors.resolvers';
import { postResolvers } from './posts/posts.resolvers';

export const typeDefs = [authorSchema, postSchema];
export const resolvers = [authorResolvers, postResolvers];

export const schema = {
  typeDefs,
  resolvers,
}