import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { FindUserInput } from './dto/find-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(user);

    if (!userSaved) {
      throw new InternalServerErrorException('Problema ao criar um usuário');
    }

    return userSaved;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async find(data: FindUserInput): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [
        {id: data.userID},
        {email: data.email},
        {username: data.username}
      ]
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);

    this.userRepository.merge(user, { ...data });
    const userUpdated = this.userRepository.save(user);

    return userUpdated;
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findOne(id);
    return (await this.userRepository.remove(user)) ? true : false;
  }
}
