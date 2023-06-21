import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  INVALID_EMAIL_MESSAGE,
  INVALID_FIELD_MESSAGE,
  PASSWORD_WEAK_MESSAGE,
} from '../auth.constants';

export class SignUpDto {
  @IsAlpha(undefined, { message: INVALID_FIELD_MESSAGE('first name') })
  @IsNotEmpty()
  firstName: string;

  @IsAlpha(undefined, { message: INVALID_FIELD_MESSAGE('last name') })
  @IsNotEmpty()
  lastName: string;

  @IsEmail(undefined, { message: INVALID_EMAIL_MESSAGE })
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: PASSWORD_WEAK_MESSAGE,
  })
  password: string;

  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: PASSWORD_WEAK_MESSAGE,
  })
  passwordConfirm: string;
}
