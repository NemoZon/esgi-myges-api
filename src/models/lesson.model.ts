import { Schema, model, Types, Document } from 'mongoose';

export interface ILesson extends Document {
  speaker: Types.ObjectId;
  object: Types.ObjectId;
  class: Types.ObjectId;
  room: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema<ILesson>(
  {
    speaker: {
      type: Schema.Types.ObjectId,
      ref: 'Speaker',
      required: true
    },
    object: {
      type: Schema.Types.ObjectId,
      ref: 'Object',
      required: true
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true
    },
    room: {
      type: String,
      required: true,
      trim: true,
      minlength: [1, 'Room name cannot be empty']
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (this: ILesson) {
          return this.endDate > this.startDate;
        },
        message: 'End date must be after start date'
      }
    }
  },
  {
    timestamps: true
  }
);

LessonSchema.index({ startDate: 1, endDate: 1 });

export default model<ILesson>('Lesson', LessonSchema);
