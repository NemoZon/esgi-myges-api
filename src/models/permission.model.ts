import { Schema, model, Document } from 'mongoose';

export type PermissionAction =
  | 'read'
  | 'write'
  | 'delete'
  | 'update'
  | 'readOwner'
  | 'writeOwner'
  | 'deleteOwner'
  | 'updateOwner';

export interface IPermission extends Document {
  action: PermissionAction;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const PermissionSchema = new Schema<IPermission>(
  {
    action: {
      type: String,
      required: true,
      enum: [
        'read',
        'write',
        'delete',
        'update',
        'readOwner',
        'writeOwner',
        'deleteOwner',
        'updateOwner'
      ]
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [2, 'Title must be at least 2 characters long'],
      maxlength: [100, 'Title must be less than 100 characters long']
    }
  },
  {
    timestamps: true
  }
);

PermissionSchema.index({ action: 1, title: 1 }, { unique: true });

export default model<IPermission>('Permission', PermissionSchema);
