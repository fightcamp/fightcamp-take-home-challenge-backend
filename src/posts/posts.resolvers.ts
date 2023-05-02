import { IResolvers } from '@graphql-tools/utils';
import { Author } from '../authors/authors.model';
// TODO missing post validation
import { IPost, IPostInput, Post } from './posts.model';

type QueryPostArgs = { id: string };
type MutationCreatePostArgs = { input: IPostInput };
type MutationUpdatePostArgs = { id: string, input: IPostInput };
type MutationDeletePostArgs = { id: string };


const resolvers: IResolvers = {
  Query: {
    post: async (_: IPost, { id }: QueryPostArgs): Promise<IPost | null> => {
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (_: IPost, { input }: MutationCreatePostArgs): Promise<IPost> => {
      const post = new Post(input);
      await post.save();
      return post;
    },
    updatePost: async (_: IPost, { id, input }: MutationUpdatePostArgs): Promise<IPost | null> => {
      return await Post.findByIdAndUpdate(id, input, { new: true });
    },
    deletePost: async (_: IPost, { id }: MutationDeletePostArgs): Promise<IPost | null> => {
      return await Post.findByIdAndDelete(id);
    },
  }
}

export default resolvers;