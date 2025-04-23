import { Schema, Types, model } from 'mongoose';

export interface ISpeaker {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  avatar: string;
  objects: Types.ObjectId[];
}

const SpeakerSchema = new Schema({
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
