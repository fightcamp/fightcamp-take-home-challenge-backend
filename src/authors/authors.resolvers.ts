import { IResolvers } from '@graphql-tools/utils';
import { Author, IAuthor, IAuthorInput } from './authors.model';
import { validateAuthorInput } from './authors.validation';
import { IPost } from '../posts/posts.model';

interface QueryAuthorArgs { id: string };
interface MutationCreateAuthorArgs { input: IAuthorInput };
interface MutationUpdateAuthorArgs { id: string, input: IAuthorInput };
interface MutationDeleteAuthorArgs { id: string };

function validateInput (input: Partial<IAuthor>): void {
  const errors = validateAuthorInput(input);
  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }
}

const resolvers: IResolvers = {
  Query: {
    author: async (_: IAuthor, { id }: QueryAuthorArgs): Promise<IAuthor | null> => {
      return await Author.findById(id);
    },
  },
  Mutation: {
    createAuthor: async (_: IAuthor, { input }: MutationCreateAuthorArgs): Promise<IAuthor> => {
      validateInput(input);
      const author = new Author(input);
      await author.save();
      return author;
    },
    updateAuthor: async (_: IAuthor, { id, input }: MutationUpdateAuthorArgs): Promise<IAuthor | null> => {
      validateInput(input);
      return await Author.findByIdAndUpdate(id, input, { new: true });
    },
    deleteAuthor: async (_: IAuthor, { id }:  MutationDeleteAuthorArgs): Promise<IAuthor | null> => {
      return await Author.findByIdAndDelete(id);
    },
  },
  Author: {
    posts: async (parent: IAuthor): Promise<IPost[]> => {
      const merge = await parent.populate<{ posts: IPost[]}>('posts')
      return merge.posts
    },
  }
}

export default resolvers;