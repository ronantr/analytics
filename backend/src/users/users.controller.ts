import { Body, Controller, Put, UseGuards, Request, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './users.request';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}


  @Put('update')
  @UseGuards(AuthGuard)
  update(userDto: UpdateUserDto, @Request() req) {
    const user = req.user;

    if (!user) {
      return null;
    }

    Object.keys(userDto).forEach(key => {
      if (!['id', 'password', 'roles', 'isVerified'].includes(key)) {
        user[key] = userDto[key];
      }
    });

    return this.usersService.update(user, userDto);
  }

}