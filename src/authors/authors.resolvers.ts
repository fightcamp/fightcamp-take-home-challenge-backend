import { IResolvers } from '@graphql-tools/utils';
import { Author, IAuthor } from './authors.model';
import { validateAuthorInput } from './authors.validation';

const resolvers: IResolvers = {
  Query: {
    author: async (_: any, { id }: any): Promise<IAuthor | null> => {
      return await Author.findById(id);
    },
  },
  Mutation: {
    createAuthor: async (_: any, { input }: any): Promise<IAuthor> => {
      const errors = validateAuthorInput(input);
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      const author = new Author(input);
      await author.save();
      return author;
    },
    updateAuthor: async (_: any, { id, input }: any): Promise<IAuthor | null> => {
      const errors = validateAuthorInput(input);
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }

      return await Author.findByIdAndUpdate(id, input, { new: true });
    },
    deleteAuthor: async (_: any, { id }: any): Promise<IAuthor | null> => {
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