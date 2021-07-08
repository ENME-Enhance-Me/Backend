import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreatePhoneInput } from './dto/create-phone.input';
import FindPhoneInput from './dto/find-phone.input';
import { UpdatePhoneInput } from './dto/update-phone.input';
import { Phone } from './entities/phone.entity';

@Injectable()
export class PhoneService {

  constructor(
    @InjectRepository(Phone)
    private readonly phoneRepository: Repository<Phone>,
    private readonly userService: UserService
  ) { }

  async create(data: CreatePhoneInput) {
    const user = await this.userService.findOne(data.userID);

    const phone = this.phoneRepository.create({
      DDD: data.DDD,
      number: data.number,
      user: user
    });
    const phoneSaved = await this.phoneRepository.save(phone);

    if (!phoneSaved) {
      throw new InternalServerErrorException('Problema ao criar um telefone');
    }

    return phoneSaved;
  }

  async findAll() {
    return await this.phoneRepository.find();
  }

  async findOne(id: string) {
    return await this.phoneRepository.findOne(id);
  }

  async find(data: FindPhoneInput): Promise<Phone[]> {

    const user = await this.userService.findOne(data.userID);

    const phones = await this.phoneRepository.find({
      where: [
        { id: data.id },
        { DDD: data.DDD },
        { number: data.number },
        { user }
      ],
      relations: [ 'user' ]
    });
    return phones;
  }

  async update(id: string, data: UpdatePhoneInput) {
    return `This action updates a #${id} phone`;
  }

  async remove(id: string) {
    return `This action removes a #${id} phone`;
  }
}
