import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { strict } from 'assert';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}
  async register(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(
      password, 10
    );
    const user = this.repo.create({
      ...createUserDto, password: hashedPassword
    });

    return this.repo.save(user);
  }

  async validateUser(credential: LoginUserDto): Promise<User> {
    const user = await this.getByUsername(credential.username);
    if (!user) {
      throw new UnauthorizedException('Incorrect credential');
    }
    const isValid = await bcrypt.compare(credential.password, user.password) 
    if (!isValid) {
      throw new UnauthorizedException('Incorrect credential');
    }
    return user;
  }

  async getByUsername(username: string): Promise<User | null> {
    return await this.repo.findOne({where: {username}});
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
