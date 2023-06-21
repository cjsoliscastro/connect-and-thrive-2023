import { Matches, MaxLength, MinLength } from 'class-validator';
import { PASSWORD_WEAK_MESSAGE } from 'src/auth/auth.constants';

export class UpdateUserPasswordDto {
  previousPassword: string;

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
