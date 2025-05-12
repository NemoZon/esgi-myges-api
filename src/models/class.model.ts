import { model, Schema, Types } from 'mongoose';

export interface IClass {
  _id: string;
  title: string;
  students: Types.ObjectId[];
}

const ClassSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      default: []
    }
  ]
});

export default model('Class', ClassSchema);
