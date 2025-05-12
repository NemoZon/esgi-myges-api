import { model, Schema, Types } from 'mongoose';

export interface ILesson {
  _id: Types.ObjectId;
  speaker: Types.ObjectId;
  object: Types.ObjectId;
  class: Types.ObjectId;
  room: string;
  startDate: Date;
  endDate: Date;
}

const LessonSchema = new Schema({
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
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

export default model('Lesson', LessonSchema);
