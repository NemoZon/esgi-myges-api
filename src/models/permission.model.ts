import { Schema, Types, model } from 'mongoose';

export interface IPermission {
  _id: Types.ObjectId;
  action: string;
  title: string[];
}

const PermissionSchema = new Schema({
  action: {
    type: String,
    required: true,
    enum: ['read', 'write', 'delete', 'update']
  },
  title: {
    type: String,
    required: true
  }
});

export default model('Permission', PermissionSchema);
