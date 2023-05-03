import { IPost } from './posts.model';

export const validatePostInput = (postInput: Partial<IPost>): string[] => {
  const errors: string[] = [];

  if (!postInput.title || postInput.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (!postInput.content || postInput.content.trim().length === 0) {
    errors.push('Content is required');
  }

  return errors;
};
