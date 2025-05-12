import { Request, Response, NextFunction } from 'express';
import ApiError from '../helpers/ApiError';
import tokenService from '../services/token.service';
import UserDto from '../dto/user.dto';

export interface AuthRequest extends Request {
  user?: UserDto;
}

export default function (req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw ApiError.unauthorized();
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      throw ApiError.unauthorized();
    }

    const userData: UserDto | null =
      tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw ApiError.unauthorized();
    }

    req.user = userData;
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('jwt')) {
        next(ApiError.unauthorized());
        return;
      }

      next(new ApiError(500, error.message));
    } else {
      next(new ApiError(500, 'Unknown server error'));
    }
  }
}
