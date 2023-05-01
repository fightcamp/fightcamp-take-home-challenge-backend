import { IResolvers } from '@graphql-tools/utils';
import { Author, IAuthor } from '../../models/author';
import { validateAuthorInput } from '../../utils/validation';
import { IPost, Post } from '../../models/post';

const resolvers: IResolvers = {
  Query: {
    author: async (_: any, { id }: any): Promise<IAuthor | null> => {
      return await Author.findById(id);
    },
    post: async (_: any, { id }: any): Promise<IPost | null> => {
      return await Post.findById(id);
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
    createPost: async (_: any, { input }: any): Promise<IPost> => {
      const post = new Post(input);
      await post.save();
      return post;
    },
    updatePost: async (_: any, { id, input }: any): Promise<IPost | null> => {
      return await Post.findByIdAndUpdate(id, input, { new: true });
    },
    deletePost: async (_: any, { id }: any): Promise<IPost | null> => {
      return await Post.findByIdAndDelete(id);
    },
  },
  Author: {
    posts: async (parent: IAuthor) => {
      return parent.populate('posts').then((author: { posts: any; }) => author.posts);
    },
  }
}

export default resolvers;