import { IsAlpha, IsEmail, IsOptional } from 'class-validator';
import {
  INVALID_FIELD_MESSAGE,
  INVALID_EMAIL_MESSAGE,
} from 'src/auth/auth.constants';

export class UpdateUserInfoDto {
  @IsOptional()
  @IsAlpha(undefined, { message: INVALID_FIELD_MESSAGE('first name') })
  firstName?: string;

  @IsOptional()
  @IsAlpha(undefined, { message: INVALID_FIELD_MESSAGE('last name') })
  lastName?: string;

  @IsOptional()
  @IsEmail(undefined, { message: INVALID_EMAIL_MESSAGE })
  email?: string;

  password?: string;
}
