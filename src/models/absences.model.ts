import mongoose, { model, Schema, Types, Document } from 'mongoose';

export interface IAbsence extends Document {
  isJustified: boolean;
  justification?: string;
  lesson: Types.ObjectId;
  student: Types.ObjectId;
}

const AbsenceSchema = new Schema(
  {
    isJustified: {
      type: Boolean,
      default: false
    },
    // CDN URL for the justification document
    justification: {
      type: String,
      required: false,
      validate: {
        validator: function (this: IAbsence) {
          return !this.isJustified || !!this.justification;
        },
        message: 'Justification is required if absence is justified.'
      }
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

AbsenceSchema.index({ student: 1, lesson: 1 }, { unique: true });

AbsenceSchema.pre('save', async function (next) {
  const studentExists = await mongoose
    .model('Student')
    .exists({ _id: this.student });
  if (!studentExists) {
    throw new Error('Student not found');
  }
  next();
});

export default model<IAbsence>('Absence', AbsenceSchema);
