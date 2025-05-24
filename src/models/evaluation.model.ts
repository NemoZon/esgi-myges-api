import { Schema, model, Types, Document } from 'mongoose';

export interface IEvaluation extends Document {
  value?: number;
  lesson: Types.ObjectId;
  student: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EvaluationSchema = new Schema<IEvaluation>(
  {
    value: {
      type: Number,
      min: [0, 'Value must be greater than 0'],
      max: [20, 'Value must be lower than 20'],
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
  },
  {
    timestamps: true
  }
);

EvaluationSchema.index({ lesson: 1, student: 1 }, { unique: true });

export default model<IEvaluation>('Evaluation', EvaluationSchema);
