import { IResolvers } from '@graphql-tools/utils';
import { Author, IAuthor, IAuthorInput } from './authors.model';
import { validateAuthorInput } from './authors.validation';

type QueryAuthorArgs = { id: string };
type MutationCreateAuthorArgs = { input: IAuthorInput };
type MutationUpdateAuthorArgs = { id: string, input: IAuthorInput };
type MutationDeleteAuthorArgs = { id: string };

const resolvers: IResolvers = {
  Query: {
    author: async (_: IAuthor, { id }: QueryAuthorArgs): Promise<IAuthor | null> => {
      return await Author.findById(id);
    },
  },
  Mutation: {
    createAuthor: async (_: IAuthor, { input }: MutationCreateAuthorArgs): Promise<IAuthor> => {
      const errors = validateAuthorInput(input);
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      const author = new Author(input);
      await author.save();
      return author;
    },
    updateAuthor: async (_: IAuthor, { id, input }: MutationUpdateAuthorArgs): Promise<IAuthor | null> => {
      const errors = validateAuthorInput(input);
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      return await Author.findByIdAndUpdate(id, input, { new: true });
    },
    deleteAuthor: async (_: IAuthor, { id }:  MutationDeleteAuthorArgs): Promise<IAuthor | null> => {
      return await Author.findByIdAndDelete(id);
    },
  },
  Author: {
    posts: async (parent: IAuthor) => {
      return parent.populate('posts').then((author: { posts: any; }) => author.posts);
    },
  }
}

export default resolvers;