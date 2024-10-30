import {
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/role/roles.enum';

export class CreateUsersDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @IsStrongPassword({ minLength: 6, minUppercase: 1, minNumbers: 1 })
  password?: string;

  @IsString()
  @IsOptional()
  roles?: Role;
}
