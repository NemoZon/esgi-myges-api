import { model, Schema, Types } from 'mongoose';

export interface IEvaluation {
  _id: Types.ObjectId;
  value: number;
  lesson: Types.ObjectId;
  student: Types.ObjectId;
}
const EvaluationSchema = new Schema({
  value: {
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

export default model('Evaluation', EvaluationSchema);
