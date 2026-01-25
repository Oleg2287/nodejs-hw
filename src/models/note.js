import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Trim spaces.
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      default: 'Todo',
      enum: TAGS,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

noteSchema.index(
  {
    title: 'text',
    content: 'text',
  },
  {
    name: 'NoteTextIndex',
  },
);

export const Note = model('Note', noteSchema);
