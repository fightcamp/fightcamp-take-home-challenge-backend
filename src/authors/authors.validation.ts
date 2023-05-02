import { IAuthor } from './authors.model';
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