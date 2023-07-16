import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from '../users/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signUp(@Body() signUpDto: User) {
    const user = await this.authService.signUp(signUpDto);
    return {
      message: 'User registered successfully',
      user,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: { email: string; password: string }) {
    const { email, password } = signInDto;
    const accessToken = await this.authService.signIn(email, password);
    return {
      message: 'Login successful',
      accessToken,
    };
  }
  
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const { password, ...user } = req.user;
    return user;
  }
}
