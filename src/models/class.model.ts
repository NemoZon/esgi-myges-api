import { Schema, model, Types, Document } from 'mongoose';

export interface IClass extends Document {
  title: string;
  students: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ClassSchema = new Schema<IClass>(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters long'],
      maxlength: [100, 'Title must be at most 100 characters long']
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student'
      }
    ]
  },
  {
    timestamps: true
  }
);

ClassSchema.index({ students: 1 });

// save hook to ensure no duplicate student IDs
ClassSchema.pre('save', function (next) {
  this.students = Array.from(
    new Set(this.students.map((id) => id.toString()))
  ).map((id) => new Types.ObjectId(id));
  next();
});

export default model<IClass>('Class', ClassSchema);
