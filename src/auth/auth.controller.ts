import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { LoginInterface } from './interface/login.interface';
import { ResponseInterceptor } from 'src/general/interceptor/response.interceptor';
import { Public } from 'src/general/decorator/public.decorator';

@UseInterceptors(ResponseInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body(ValidationPipe) payload: CreateUsersDto) {
    const data = await this.authService.register(payload);
    return { data, message: 'Register succesffully' };
  }

  @Public()
  @Post('login')
  async login(@Body(ValidationPipe) payload: LoginInterface) {
    const data = await this.authService.login(payload);
    return { data, message: 'Login Successfully' };
  }
}
