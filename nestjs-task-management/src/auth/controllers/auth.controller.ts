import { Body, Controller, Post } from '@nestjs/common';
import { UserCredentialsDto } from '../dtos/user-credentials.dto';
import { AuthService } from '../services/auth.service';
import { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() body: UserCredentialsDto): Promise<User> {
    return this.authService.signUp(body);
  }

  @Post('/signin')
  signIn(@Body() body: UserCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(body);
  }
}
