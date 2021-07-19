import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'graphql-upload';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { BrandService } from '../brand/brand.service';
import { Brand } from '../brand/entities/brand.entity';
import { CreateUserInput } from './dto/create-user.input';
import { FindUserInput } from './dto/find-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cloudService: CloudinaryService
  ) { }

  async create(data: CreateUserInput, avatar: FileUpload, brand?:Brand): Promise<User> {
    if (await this.userRepository.findOne({ email: data.email })) {
      throw new BadRequestException("E-mail já existente.");
    }
    if (await this.userRepository.findOne({ username: data.username })) {
      throw new BadRequestException("Nome de usuário já existente.");
    }
    const user = this.userRepository.create(data);
    try {
      const file = await this.cloudService.uploadImage(avatar, "enme/avatar");
      user.avatar = file.url;
    }
    catch (err) {
      user.avatar = "https://res.cloudinary.com/enme/image/upload/v1626717618/avatar/user_avatar.png"
    }
    user.brand = brand;
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
    const user = await this.userRepository.findOneOrFail({
      where: [
        { id: data.userID },
        { email: data.email },
        { username: data.username }
      ]
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async findMany(brand: Brand): Promise<User[]> {
    const user = await this.userRepository.find({
      where: { brand },
      relations: ['brand']
    });
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
    let avatar: string;
    avatar = this.getIDImage(user.avatar);
    console.log('enme/avatar/'+avatar);
    if (!(avatar === "user_avatar")) {
      this.cloudService.deleteImage('enme/avatar/'+avatar);
    }
    return (await this.userRepository.remove(user)) ? true : false;
  }

  private getIDImage(link: string): string {
    const parts = link.split('/');
    const imageid = parts[parts.length - 1].split('.')[0];
    console.log("imageid " + imageid)
    return imageid

  }
}
