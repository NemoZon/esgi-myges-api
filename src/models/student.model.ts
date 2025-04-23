import { model, Schema, Types } from 'mongoose';

export interface IStudent {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  avatar: string;
  evaluations: Types.ObjectId[];
  absences: Types.ObjectId[];
  class: Types.ObjectId;
}

const StudentSchema = new Schema({
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
    ref: 'Class',
    required: true
  }
});

export default model('Student', StudentSchema);
