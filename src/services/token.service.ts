import jwt from 'jsonwebtoken';
import UserDto from '../dto/user.dto';

class TokenService {
  generateTokens(payload: UserDto): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: '30m'
      }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: '30d'
      }
    );

    return {
      accessToken,
      refreshToken
    };
  }

  validateAccessToken(token: string): UserDto | null {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
      throw new Error('JWT_ACCESS_SECRET is not defined in .env file');
    }
    return jwt.verify(token, secret) as UserDto;
  }

  validateRefreshToken(token: string): UserDto | null {
    const refresh = process.env.JWT_REFRESH_SECRET;
    if (!refresh) {
      throw new Error('JWT_REFRESH_SECRET is not defined in .env file');
    }
    return jwt.verify(token, refresh) as UserDto;
  }
}

export default new TokenService();
