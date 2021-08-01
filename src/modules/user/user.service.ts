import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseInterface } from 'src/interface/respones.interface';
import { Auth, AuthDocument } from 'src/model/auth.schema';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram';
import { registerDto } from '../auth/Auth.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}

  async findOneById(id: string) {
    return this.authModel.findById(id);
  }

  async findOneByUserName(username: string): Promise<AuthDocument> {
    return this.authModel.findOne({ username });
  }

  async register(data: registerDto): Promise<ResponseInterface> {
    const { password, username } = data;
    const user = await this.findOneByUserName(username);
    if (user) {
      return {
        code: 400,
        msg: '该用户已存在',
      };
    }
    const salt = makeSalt();
    const hashPassword = encryptPassword(password, salt);
    try {
      const createUser = await this.authModel.create({
        username,
        password: hashPassword,
        salt,
      });
      return {
        code: 200,
        data: createUser,
        msg: '创建成功',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
