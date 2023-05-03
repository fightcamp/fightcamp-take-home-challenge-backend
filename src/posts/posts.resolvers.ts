import { IResolvers } from '@graphql-tools/utils';
import { Author, IAuthor } from '../authors/authors.model';
import { IPost, IPostInput, IPostUpdateInput, Post } from './posts.model';
import { validatePostInput } from './posts.validation';

interface QueryPostArgs { id: string };
interface MutationCreatePostArgs { input: IPostInput };
interface MutationUpdatePostArgs { id: string, input: IPostUpdateInput };
interface MutationDeletePostArgs { id: string };

function validateInput (input: Partial<IPost>): void {
  const errors = validatePostInput(input);
  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }
}

const resolvers: IResolvers = {
  Query: {
    post: async (_: IPost, { id }: QueryPostArgs): Promise<IPost | null> => {
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (_: IPost, { input }: MutationCreatePostArgs): Promise<IPost> => {
      validateInput(input);
      const author = await Author.findById(input.authorId);
      if (!author) throw new Error('Author not found');
      const post = new Post(input);
      post.author = author._id;
      await post.save();
      author.posts.push(post._id);
      await author.save();
      return post;
    },
    updatePost: async (_: IPost, { id, input }: MutationUpdatePostArgs): Promise<IPost | null> => {
      validateInput(input);
      return await Post.findByIdAndUpdate(id, input, { new: true });
    },
    deletePost: async (_: IPost, { id }: MutationDeletePostArgs): Promise<IPost | null> => {
      return await Post.findByIdAndDelete(id);
    },
  },
  Post: {
    author: async (parent: IPost): Promise<IAuthor> => {
      const merge = await parent.populate<{ author: IAuthor}>('author')
      return merge.author
    },
  }
}

export default resolvers;