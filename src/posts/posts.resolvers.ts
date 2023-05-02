import { IResolvers } from '@graphql-tools/utils';
import { Author } from '../authors/authors.model';
// TODO missing post validation
import { IPost, Post } from './posts.model';

const resolvers: IResolvers = {
  Query: {
    post: async (_: any, { id }: any): Promise<IPost | null> => {
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (_: any, { input }: any): Promise<IPost> => {
      const post = new Post(input);
      post.author = input.authorId;
      await post.save();
      const author = await Author.findByIdAndUpdate(input.authorId);
      if (author) { 
        author.posts.push(post._id);
        await author.save();
      }
      return post;
    },
    updatePost: async (_: any, { id, input }: any): Promise<IPost | null> => {
      return await Post.findByIdAndUpdate(id, input, { new: true });
    },
    deletePost: async (_: any, { id }: any): Promise<IPost | null> => {
      return await Post.findByIdAndDelete(id);
    },
  }
}

export default resolvers;