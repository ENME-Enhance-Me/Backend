import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    return await this.userRepository.findOneOrFail(id);
  }

  async find(data: FindUserInput): Promise<User> {
    return await this.userRepository.findOneOrFail({
      where: [
        {id: data.userID},
        {email: data.email},
        {username: data.username}
      ]
    });
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);

    await this.userRepository.update(user, { ...data });
    const userUpdated = this.userRepository.create({ ...user, ...data });

    return userUpdated;
  }

  async remove(id: string): Promise<boolean> {
    const user = await this.findOne(id);
    return (await this.userRepository.remove(user)) ? true : false;
  }
}
