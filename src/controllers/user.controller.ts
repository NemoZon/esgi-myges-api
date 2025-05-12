import { Request, Response } from 'express';
import userService from '../services/user.service';

class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const filter = req.query;
      const users = await userService.get(filter);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching roles' });
    }
  }
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { user, role, roleTitle } = req.body;
      const {
        user: newUser,
        accessToken,
        refreshToken
      } = await userService.register(user, role, roleTitle);
      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.MODE !== 'dev' // ONLY FOR HTTPS SERVERS
      });
      res.status(201).json({
        user: newUser,
        accessToken,
        refreshToken
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  }
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { userEmail, userPassword } = req.body;
      const userData = await userService.login(userEmail, userPassword);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.MODE !== 'dev' // ONLY FOR HTTPS SERVERS
      });

      res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while login' });
    }
  }
  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie('refreshToken');
      res.status(200).json({});
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while logout' });
    }
  }
  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.MODE !== 'dev', // ONLY FOR HTTPS SERVERS
        sameSite: 'none' // to allow cross domain requests
      });

      res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error while refresh' });
    }
  }
}
const userController = new UserController();
export default userController;
