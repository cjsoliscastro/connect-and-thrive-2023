import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserInfoDto } from 'src/users/dtos/update-user-info.dto';
import { UpdateUserPasswordDto } from 'src/users/dtos/update-user-password.dto';
import { UsersService } from 'src/users/users.service';
import { PASSWORD_CONFIRMATION_ERROR_MESSAGE } from './auth.constants';
import { comparePasswords, hashPassword } from './auth.utils';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(userCreds: SignUpDto) {
    const { passwordConfirm, ...user } = userCreds;
    if (userCreds.password !== passwordConfirm) {
      throw new BadRequestException(PASSWORD_CONFIRMATION_ERROR_MESSAGE);
    }
    user.password = (await hashPassword(passwordConfirm)).toString();

    return this.usersService.save(user);
  }

  async signIn(userCreds: SignInDto) {
    const { email, password } = userCreds;
    const user = await this.usersService.findOne({ email });

    if (!user || !(await comparePasswords(password, user.password))) {
      throw new BadRequestException('Incorrect credentials');
    }

    return this.jwtService.signAsync({
      id: user.id,
    });
  }

  async getUser(cookie: any) {
    const { id } = await this.jwtService.verifyAsync(cookie);
    return this.usersService.findOne({ id });
  }

  async updateUserInfo(cookie: any, options: UpdateUserInfoDto) {
    const { id } = await this.jwtService.verifyAsync(cookie);
    return this.usersService.updateUser(id, options);
  }

  async updateUserPassword(
    cookie: any,
    { previousPassword, password, passwordConfirm }: UpdateUserPasswordDto,
  ) {
    const { id } = await this.jwtService.verifyAsync(cookie);
    const user = await this.usersService.findOne({ id });
    if (!user) {
      throw new NotFoundException('User was not found');
    } else if (!(await comparePasswords(previousPassword, user.password))) {
      throw new BadRequestException('Previous password does not match');
    } else if (password !== passwordConfirm) {
      throw new BadRequestException(PASSWORD_CONFIRMATION_ERROR_MESSAGE);
    }

    const newHashedPassword = (await hashPassword(passwordConfirm)).toString();

    return this.usersService.updateUser(id, { password: newHashedPassword });
  }
}
