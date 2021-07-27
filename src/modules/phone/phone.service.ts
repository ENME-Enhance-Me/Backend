import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandService } from '../brand/brand.service';
import { ClientsService } from '../clients/clients.service';
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
    private readonly userService: UserService,
    private readonly clientService: ClientsService
  ) { }

  async create(data: CreatePhoneInput): Promise<Phone> {
    const phoneExists = await this.phoneRepository.findOne({
      DDD: data.DDD,
      number: data.number
    });
    if(phoneExists){
      throw new InternalServerErrorException('Este telefone já existe');
    }
    let user = undefined
    if(data.userID){
      user = await this.userService.findOne(data.userID);
    }
    else if(data.clientID){
      const client = await this.clientService.findOne(data.clientID);
      user = await this.userService.findOne(client.userID);
    }
    else{
      throw new NotFoundException('Usuário não encontrado')
    }
    

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

  async findAll(): Promise<Phone[]> {
    return await this.phoneRepository.find();
  }

  async findOne(id: string): Promise<Phone> {
    const phone = await this.phoneRepository.findOne({
      where: {id}
    });
    if (!phone) {
      throw new NotFoundException('Telefone não encontrado');
    }
    return phone;
  }

  async find(data: FindPhoneInput): Promise<Phone[]> {

    const user = await this.userService.findOne(data.userID);

    const phones = await this.phoneRepository.find({
      where: [
        { id: data.id },
        { DDD: data.DDD, number: data.number },
        { user }
      ],
      relations: ['user']
    });
    return phones;
  }

  async update(id: string, data: UpdatePhoneInput): Promise<Phone> {
    const phone = await this.findOne(id);

    //Concatena a informação nova com a velha
    let phoneAlmostUpdated = new Phone();
    phoneAlmostUpdated = {...phone, ...data};
    
    //utiliza as informações concatenadas para buscar se o novo número já existe no banco
    const phoneExists = await this.phoneRepository.findOne({
      DDD: phoneAlmostUpdated.DDD,
      number: phoneAlmostUpdated.number
    });
    //checa se o novo número existe e se não é o mesmo que está sendo atualizado
    if(phoneExists && phone.id !== phoneExists.id){
      throw new InternalServerErrorException('Este telefone já existe');
    }

    this.phoneRepository.merge(phone, {...data});
    const phoneUpdated = await this.phoneRepository.save(phone);
    return phoneUpdated;
  }

  async remove(id: string): Promise<boolean> {
    const phone = await this.findOne(id);
    
    return (await this.phoneRepository.remove(phone))? true: false;
  }
}
