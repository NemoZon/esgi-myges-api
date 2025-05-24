import { model, Schema, Types, Document } from 'mongoose';

export interface IStudent extends Document {
  user: Types.ObjectId;
  firstName: string;
  lastName: string;
  avatar?: string | null;
  evaluations: Types.ObjectId[];
  absences: Types.ObjectId[];
  class?: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
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
      minlength: [2, 'First name must be at least 2 characters long']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters long']
    },
    avatar: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string | undefined) {
          if (!v) return true;
          return /^(https?:\/\/)[^\s]+$/.test(v);
        },
        message: 'Avatar must be a valid URL'
      }
    },
    evaluations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Evaluation',
        default: []
      }
    ],
    absences: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Absence',
        default: []
      }
    ],
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      default: null
    }
  },
  {
    timestamps: true
  }
);

StudentSchema.index({ user: 1 }, { unique: true });

export default model<IStudent>('Student', StudentSchema);
