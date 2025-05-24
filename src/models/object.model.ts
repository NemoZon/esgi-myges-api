import { Schema, model, Document } from 'mongoose';

export interface IObject extends Document {
  title: string;
  logo?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ObjectSchema = new Schema<IObject>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      unique: true,
      trim: true,
      minlength: [2, 'Title must be at least 2 characters long']
    },
    logo: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string | undefined) {
          if (!v) return true;
          return /^(http|https):\/\/.+/.test(v);
        },
        message: 'Logo must be a valid URL'
      }
    }
  },
  {
    timestamps: true
  }
);

ObjectSchema.index({ title: 1 });

export default model<IObject>('Object', ObjectSchema);
