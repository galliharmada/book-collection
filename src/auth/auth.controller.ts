import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { LoginInterface } from './interface/login.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() payload: CreateUsersDto) {
    const data = this.authService.register(payload);
    return data;
  }

  @Post('login')
  login(@Body() payload: LoginInterface) {
    const result = this.authService.login(payload);
    return result;
  }
}
