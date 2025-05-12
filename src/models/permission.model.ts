import { Schema, Types, model } from 'mongoose';

export interface IPermission {
  _id: Types.ObjectId;
  action: string;
  title: string;
}

const PermissionSchema = new Schema({
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
    required: true
  }
});

PermissionSchema.index({ action: 1, title: 1 }, { unique: true });

export default model('Permission', PermissionSchema);
