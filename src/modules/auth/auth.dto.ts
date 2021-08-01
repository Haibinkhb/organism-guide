import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class registerDto {
  @ApiProperty({ name: 'username', example: '用户1', description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是字符串类型' })
  username: string;

  @ApiProperty({ name: 'password', example: '123456', description: '密码' })
  @IsNotEmpty({ message: '用密码不能为空' })
  password: string;
}

export class loginDto extends registerDto {}
