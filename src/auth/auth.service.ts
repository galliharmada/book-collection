import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import { LoginInterface } from './interface/login.interface';
import { TokenInterface } from './interface/token.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ResponseLogin } from './interface/response-login.interface';

@Injectable()
export class AuthService {
  private users: Users[] = [];
  private id = 1;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUsers: CreateUsersDto) {
    const { password, ...rest } = createUsers;

    const hashPassword = await this.hashPassword(password);

    const users = new Users({
      id: this.id++,
      password: hashPassword,
      ...rest,
    });

    this.users.push(users);
    return users;
  }

  async login(payload: LoginInterface) {
    const { email, password } = payload;
    const user = this.getByEmail(email);
    const validate = user && bcrypt.compareSync(password, user.password);
    if (!validate) throw new BadRequestException('Invalid Password');

    const data: TokenInterface = {
      email: user.email,
      roles: user.roles,
    };
    const { accessToken, refreshToken } = await this.generateToken(data);
    const responseLogin: ResponseLogin = {
      id: user.id,
      email: user.email,
      accessToken,
      refreshToken,
      roles: user.roles,
    };

    return responseLogin;
  }

  getAll(): Users[] {
    return this.users;
  }

  getByEmail(email: string): Users {
    const users = this.users.find((user) => user.email === email);
    if (users === undefined) throw new NotFoundException();
    return users;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async generateToken(payload: TokenInterface) {
    const { id, email, roles } = payload;

    const expirationTimeInSeconds = 24 * 60 * 60;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id,
          email,
          roles,
        },
        {
          secret: this.configService.getOrThrow(`JWT_SECRET`),
          expiresIn: expirationTimeInSeconds,
        },
      ),
      this.jwtService.signAsync(
        {
          id,
          email,
          roles,
        },
        {
          secret: this.configService.getOrThrow(`JWT_SECRET`),
          expiresIn: expirationTimeInSeconds,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async decryptTokenHeadersJwt(token: string) {
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow('JWT_SECRET'),
      });
      return payload;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
