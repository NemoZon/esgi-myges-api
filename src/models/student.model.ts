import { model, Schema, Types } from 'mongoose';

export interface IStudent {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  firstName: string;
  lastName: string;
  avatar?: string | null;
  evaluations: Types.ObjectId[];
  absences: Types.ObjectId[];
  class?: Types.ObjectId | null;
}

const StudentSchema = new Schema({
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
    ref: 'Class'
  }
});

export default model('Student', StudentSchema);
