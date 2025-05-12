import permissionModel from '../../models/permission.model';

const actions = [
  'read',
  'write',
  'delete',
  'update',
  'readOwner',
  'writeOwner',
  'deleteOwner',
  'updateOwner'
];

// this list could be more flexible and specific e.g. ['studentAbsence', 'studentEvaluation', 'studentClass', 'userPassword' ...]
const titles = [
  'student',
  'speaker',
  'admin',
  'lesson',
  'evaluation',
  'absence',
  'class',
  'permission',
  'user',
  'role',
  'object'
];

export default async function permissionInit(): Promise<void> {
  try {
    const existings = await permissionModel.find();
    if (existings.length > 0) {
      console.log('Permissions already exist, skipping initialization.');
      return;
    }
    const permissionDocs = [];

    for (const action of actions) {
      for (const title of titles) {
        permissionDocs.push({ action, title });
      }
    }

    await permissionModel.insertMany(permissionDocs);
    console.log('Permissions initialized.');
  } catch (error) {
    console.error('Error initializing permissions:', error);
  }
}
