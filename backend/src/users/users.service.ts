import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './users.request';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    newUser.password = await bcrypt.hash(createUserDto.password, 10);
    newUser.isVerified = false;
    newUser.roles = JSON.stringify(['ROLE_USER']);
    await this.userRepository.save(newUser);

    return { message: 'User registered successfully' };
  }

  async validate(id: string): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({id});
    user.isVerified = true;
    const upadte = await this.userRepository.save(user);
    return upadte;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const user = await this.userRepository.findOneByOrFail({ id });
    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
    console.log("res",updatedUser)

    return updatedUser;
  }



  async find(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

}
