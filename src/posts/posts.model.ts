import { Schema, model, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    key: '_id',
  },
});

export const Post = model<IPost>('Post', postSchema);
