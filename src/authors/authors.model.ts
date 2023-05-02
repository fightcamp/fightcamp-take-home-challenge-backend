import { Schema, model, Document } from 'mongoose';

export interface IAuthorInput {
  name: string;
  email: string;
}

export interface IAuthor extends Document {
  name: string;
  email: string;
  posts: Schema.Types.ObjectId[];
}

const authorSchema = new Schema<IAuthor>({
  name: { 
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

export const Author = model<IAuthor>('Author', authorSchema);
