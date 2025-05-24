import { model, Schema, Types, Document } from 'mongoose';
import { IRole } from './role.model';

export interface IUser extends Document {
  email: string;
  password: string;
  roles: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPopulated extends Omit<IUser, 'roles'> {
  roles: IRole[];
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
      minlength: [8, 'Password must be at least 8 characters']
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

UserSchema.index({ email: 1 }, { unique: true });

export default model<IUser>('User', UserSchema);
