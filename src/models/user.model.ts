import { model, Schema, Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  roles: Types.ObjectId[];
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    }
  ]
});

export default model('User', UserSchema);
