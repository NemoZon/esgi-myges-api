import UserDTO from '../dto/user.dto';
import ApiError from '../helpers/ApiError';
import { IRole } from '../models/role.model';
import { ISpeaker } from '../models/speaker.model';
import { IStudent } from '../models/student.model';
import userModel, { IUser } from '../models/user.model';
import roleService from './role.service';
import speakerService from './speaker.service';
import studentService from './student.service';
import bcrypt from 'bcrypt';
import tokenService from './token.service';

class UserService {
  async get(query: Partial<IUser>): Promise<IUser[]> {
    try {
      const users = await userModel.find(query).populate('roles');
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
  async createStudent(
    user: Omit<IUser, '_id' | 'roles'>,
    student: Omit<IStudent, '_id' | 'user'>
  ): Promise<{ user: IUser; student: IStudent }> {
    try {
      const studentRole = await roleService.get({ roleTitle: 'student' });
      if (studentRole.length === 0) {
        throw new Error('Student role not found');
      }
      const newUser = await userModel.create({
        ...user,
        roles: studentRole.map((role) => role._id)
      });

      const newStudent = await studentService.create({
        ...student,
        user: newUser._id
      });
      return { user: newUser, student: newStudent };
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  }
  async createSpeaker(
    user: Omit<IUser, '_id' | 'roles'>,
    speaker: Omit<ISpeaker, '_id' | 'user'>
  ): Promise<{ user: IUser; speaker: ISpeaker }> {
    try {
      const speakerRole = await roleService.get({ roleTitle: 'speaker' });
      if (speakerRole.length === 0) {
        throw new Error('Speaker role not found');
      }
      const newUser = await userModel.create({
        ...user,
        roles: speakerRole.map((role) => role._id)
      });
      const newSpeaker = await speakerService.create({
        ...speaker,
        user: newUser._id
      });
      return { user: newUser, speaker: newSpeaker };
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  }

  async createAdmin(user: Omit<IUser, '_id' | 'roles'>): Promise<IUser> {
    try {
      const adminRole = await roleService.get({ roleTitle: 'admin' });
      if (adminRole.length === 0) {
        throw new Error('Admin role not found');
      }
      const newUser = await userModel.create({
        ...user,
        roles: adminRole.map((role) => role._id)
      });
      return newUser;
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  }

  async register(
    user: Omit<IUser, '_id' | 'roles'>,
    role: Omit<ISpeaker, '_id' | 'user'> | Omit<IStudent, '_id' | 'user'>,
    roleTitle: 'speaker' | 'student'
  ): Promise<{
    user: IUser;
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const candidate = await userModel.findOne({ email: user.email });
      if (candidate) {
        throw ApiError.badRequest('User with the same email already exists');
      }
      const result: { user?: IUser } = {};
      const password = await bcrypt.hash(user.password, 3);
      const userData = { ...user, password };
      if (roleTitle === 'student') {
        const roleData: Omit<IStudent, '_id' | 'user'> = {
          firstName: role.firstName,
          lastName: role.lastName,
          avatar: role.avatar,
          evaluations: [],
          absences: [],
          class: 'class' in role ? role.class : undefined
        };
        const { user: newUser } = await this.createStudent(userData, roleData);
        result.user = newUser;
      } else {
        const roleData: Omit<ISpeaker, '_id' | 'user'> = {
          firstName: role.firstName,
          lastName: role.lastName,
          avatar: role.avatar,
          objects: 'objects' in role ? role.objects : []
        };
        const { user: newUser } = await this.createSpeaker(userData, roleData);
        result.user = newUser;
      }
      const createdUser = await userModel
        .findById(result.user._id)
        .populate<{ roles: IRole[] }>('roles');
      if (!createdUser) {
        throw ApiError.internal('Error while registration');
      }
      const userDto = new UserDTO(createdUser.toObject());
      const tokens = tokenService.generateTokens(userDto);
      return { user: result.user, ...tokens };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string; user: UserDTO }> {
    const user = await userModel
      .findOne({ userEmail: email })
      .populate<{ roles: IRole[] }>('roles');
    if (!user) {
      throw ApiError.badRequest("User with this email doesn't exist");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.badRequest('Password is incorrect');
    }
    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    return {
      ...tokens,
      user: userDto
    };
  }
  async refresh(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string; user: UserDTO }> {
    if (!refreshToken) {
      throw ApiError.unauthorized();
    }
    const userData: UserDTO | null =
      tokenService.validateRefreshToken(refreshToken);
    if (!userData) {
      throw ApiError.unauthorized();
    }
    const user = await userModel
      .findById(userData.id)
      .populate<{ roles: IRole[] }>('roles');
    if (!user) {
      throw ApiError.unauthorized();
    }
    const userDto = new UserDTO(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    return {
      ...tokens,
      user: userDto
    };
  }
}

const userService = new UserService();
export default userService;
