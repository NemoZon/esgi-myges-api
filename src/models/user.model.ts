import { model, Schema, Types } from 'mongoose';
import { IRole } from './role.model';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  roles: Types.ObjectId[];
}

export interface IUserPopulated extends Omit<IUser, 'roles'> {
  roles: IRole[];
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    lowercase: true
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
