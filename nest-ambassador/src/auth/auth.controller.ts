import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UpdateUserInfoDto } from 'src/users/dtos/update-user-info.dto';
import { UpdateUserPasswordDto } from 'src/users/dtos/update-user-password.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller('admin')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('signin')
  async signIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.signIn(body);
    response.cookie('jwt', jwt, { httpOnly: true });
    return { status: 'Success' };
  }

  @Post('signout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { status: 'Success' };
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async getUser(@Req() request: Request) {
    const cookie = request.cookies['jwt'];
    return this.authService.getUser(cookie);
  }

  @UseGuards(AuthGuard)
  @Patch('users/info')
  async updateInfo(@Req() request: Request, @Body() body: UpdateUserInfoDto) {
    const cookie = request.cookies['jwt'];
    return this.authService.updateUserInfo(cookie, body);
  }

  @UseGuards(AuthGuard)
  @Patch('users/password')
  async updatePassword(
    @Req() request: Request,
    @Body() body: UpdateUserPasswordDto,
  ) {
    const cookie = request.cookies['jwt'];
    return this.authService.updateUserPassword(cookie, body);
  }
}
