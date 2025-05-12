import { model, Schema, Types } from 'mongoose';

export interface IAbsence {
  _id: Types.ObjectId;
  isJustified: boolean;
  justification?: string;
  lesson: Types.ObjectId;
  student: Types.ObjectId;
}

const AbsenceSchema = new Schema({
  isJustified: {
    type: Boolean,
    default: false
  },
  // CDN URL for the justification document
  justification: {
    type: String,
    required: false
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  }
});

export default model('Absence', AbsenceSchema);
