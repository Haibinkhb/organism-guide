import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseInterface } from 'src/interface/respones.interface';
import { AuthDocument } from 'src/model/auth.schema';
import { encryptPassword } from 'src/utils/cryptogram';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async vaildateUser(
    username: string,
    password: string,
  ): Promise<ResponseInterface<AuthDocument>> {
    const user = await this.userService.findOneByUserName(username);
    if (user) {
      const hashPassword = encryptPassword(password, user.salt);
      if (hashPassword === user.password) {
        return {
          code: 200,
          data: user,
          msg: '验证成功',
        };
      } else {
        return {
          code: 400,
          data: null,
          msg: '密码错误',
        };
      }
    } else {
      return {
        code: 400,
        data: null,
        msg: '该用户不存在',
      };
    }
  }

  async certificate(user: AuthDocument) {
    const payload = {
      username: user.username,
      userId: user._id,
    };
    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 200,
        data: token,
        msg: '登录成功',
      };
    } catch (error) {
      return {
        code: 500,
        data: null,
        msg: `Service error: ${error}`,
      };
    }
  }
}
