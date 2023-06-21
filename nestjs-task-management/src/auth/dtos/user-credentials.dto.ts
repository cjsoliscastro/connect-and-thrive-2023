import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class UserCredentialsDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}
