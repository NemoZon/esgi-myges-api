import { model, Schema, Types } from 'mongoose';

export interface IObject {
  _id: Types.ObjectId;
  title: string;
  logo?: string | null;
}

const ObjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  logo: {
    type: String,
    required: false
  }
});

export default model('Object', ObjectSchema);
