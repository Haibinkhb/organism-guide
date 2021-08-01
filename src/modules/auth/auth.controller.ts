import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterface } from 'src/interface/respones.interface';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { loginDto, registerDto } from './Auth.dto';
import { AuthService } from './Auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {}
