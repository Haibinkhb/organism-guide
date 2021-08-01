import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseInterface } from 'src/interface/respones.interface';
import { loginDto, registerDto } from '../auth/Auth.dto';
import { AuthService } from '../auth/Auth.service';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseInterface> {
    const user = await this.userService.findOneById(id);
    return {
      code: 200,
      data: user,
      msg: '查询成功',
    };
  }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async create(@Body() data: registerDto): Promise<ResponseInterface> {
    return this.userService.register(data);
  }
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() loginParams: loginDto): Promise<ResponseInterface> {
    const { code, data } = await this.authService.vaildateUser(
      loginParams.username,
      loginParams.password,
    );
    if (code === 200) {
      return await this.authService.certificate(data);
    } else {
      return {
        code: 400,
        msg: '账号或密码错误',
      };
    }
  }
}
