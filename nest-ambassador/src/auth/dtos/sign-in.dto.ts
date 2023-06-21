import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  INVALID_EMAIL_MESSAGE,
  PASSWORD_WEAK_MESSAGE,
} from '../auth.constants';

export class SignInDto {
  @IsEmail(undefined, { message: INVALID_EMAIL_MESSAGE })
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: PASSWORD_WEAK_MESSAGE,
  })
  password: string;
}
