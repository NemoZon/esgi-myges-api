import { Schema, Types, model, Document } from 'mongoose';

export interface ISpeaker extends Document {
  user: Types.ObjectId;
  firstName: string;
  lastName: string;
  avatar?: string | null;
  objects: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const SpeakerSchema = new Schema<ISpeaker>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters']
    },
    avatar: {
      type: String,
      trim: true,
      validate: {
        validator: (url?: string) => !url || /^(http|https):\/\/.+/.test(url),
        message: 'Avatar must be a valid URL'
      }
    },
    objects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Object',
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

SpeakerSchema.index({ user: 1 }, { unique: true });

export default model<ISpeaker>('Speaker', SpeakerSchema);
