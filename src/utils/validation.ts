import { IAuthor } from '../models/author';
import { IPost } from '../models/post';
import validator from 'validator';

export const validateAuthorInput = (authorInput: Partial<IAuthor>): string[] => {
  const errors: string[] = [];

  if (!authorInput.name || authorInput.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!authorInput.email || !validator.isEmail(authorInput.email)) {
    errors.push('A valid email is required');
  }

  return errors;
};

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
