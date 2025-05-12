import permissionModel from '../../models/permission.model';
import roleService from '../../services/role.service';

async function studentRoleInit(): Promise<void> {
  try {
    const studentRole = await roleService.get({ roleTitle: 'student' });
    if (studentRole.length > 0) {
      console.log('Student role already exists, skipping initialization.');
      return;
    }
    const allReadOwnerPermissions = await permissionModel
      .find({
        action: { $in: ['readOwner'] }
      })
      .select('_id');
    const updateOwnerPermissions = await permissionModel
      .find({
        title: { $in: ['user', 'student', 'absence'] },
        action: { $in: ['updateOwner'] }
      })
      .select('_id');
    await roleService.create({
      roleTitle: 'student',
      permissions: [
        ...allReadOwnerPermissions.map((permission) => permission._id),
        ...updateOwnerPermissions.map((permission) => permission._id)
      ]
    });
  } catch (error) {
    console.error('Error initializing roles:', error);
  }
}

async function speakerRoleInit(): Promise<void> {
  try {
    const speakerRole = await roleService.get({ roleTitle: 'speaker' });
    if (speakerRole.length > 0) {
      console.log('Student role already exists, skipping initialization.');
      return;
    }
    const allReadOwnerPermissions = await permissionModel
      .find({
        action: { $in: ['readOwner'] }
      })
      .select('_id');
    const updateOwnerPermissions = await permissionModel
      .find({
        title: { $in: ['user', 'speaker'] },
        action: { $in: ['updateOwner'] }
      })
      .select('_id');

    const lessonPermissions = await permissionModel
      .find({
        title: { $in: ['absence', 'evaluation'] },
        action: {
          $in: ['updateOwner', 'writeOwner', 'deleteOwner', 'readOwner']
        }
      })
      .select('_id');

    await roleService.create({
      roleTitle: 'speaker',
      permissions: [
        ...allReadOwnerPermissions.map((permission) => permission._id),
        ...updateOwnerPermissions.map((permission) => permission._id),
        ...lessonPermissions.map((permission) => permission._id)
      ]
    });
  } catch (error) {
    console.error('Error initializing roles:', error);
  }
}

async function adminRoleInit(): Promise<void> {
  try {
    const speakerRole = await roleService.get({ roleTitle: 'admin' });
    if (speakerRole.length > 0) {
      console.log('Student role already exists, skipping initialization.');
      return;
    }
    const allPermissions = await permissionModel.find().select('_id');

    await roleService.create({
      roleTitle: 'admin',
      permissions: allPermissions.map((permission) => permission._id)
    });
  } catch (error) {
    console.error('Error initializing roles:', error);
  }
}

export default async function roleInit(): Promise<void> {
  try {
    await studentRoleInit();
    await speakerRoleInit();
    await adminRoleInit();
    console.log('Roles initialized.');
  } catch (error) {
    console.error('Error initializing roles:', error);
  }
}
