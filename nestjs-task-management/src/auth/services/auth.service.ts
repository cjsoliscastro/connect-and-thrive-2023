import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCredentialsDto } from '../dtos/user-credentials.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../entities/user.entity';
import { hashPassword, comparePasswords } from '../utils/auth.utils';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp({ username, password }: UserCredentialsDto): Promise<User> {
    const hashedPassword = await hashPassword(password);
    return await this.userService.createUser(username, hashedPassword);
  }

  async signIn({
    username,
    password,
  }: UserCredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.userService.find(username);

    if (user && (await comparePasswords(password, user.password))) {
      const payload: JwtPayload = { username: user.username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new UnauthorizedException('incorrect login credentials');
  }
}
