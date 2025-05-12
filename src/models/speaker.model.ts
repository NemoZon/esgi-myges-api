import { Schema, Types, model } from 'mongoose';

export interface ISpeaker {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  firstName: string;
  lastName: string;
  avatar?: string | null;
  objects: Types.ObjectId[];
}

const SpeakerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  objects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Object',
      required: true
    }
  ]
});

export default model('Speaker', SpeakerSchema);
