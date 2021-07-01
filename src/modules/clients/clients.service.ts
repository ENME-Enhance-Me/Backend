import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private readonly userService: UserService,
  ) {}
  async create(data: CreateClientInput) {
    const user = await this.userService.create({
      Email: data.Email,
      UserName: data.UserName,
      Password: data.Password,
    });

    const client = this.clientRepository.create({
      FirstName: data.FirstName,
      LastName: data.LastName,
      BirthDate: data.BirthDate,
      Gender: data.Gender,
      Reputation: 0,
      user: user,
    });
    const clientCreated = await this.clientRepository.save(client);

    if (!clientCreated) {
      throw new InternalServerErrorException('Problemas ao criar um cliente');
    }
    return clientCreated;
  }

  findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async findOne(id: string): Promise<Client> {
    return await this.clientRepository.findOneOrFail(id);
  }

  async update(id: string, data: UpdateClientInput):  Promise<Client> {
    const client = await this.findOne(id);

    await this.clientRepository.merge(client, { ...data });
    const clientUpdated = this.clientRepository.save(client);
    return clientUpdated;
  }

  async remove(id: string) {
    const client = await this.findOne(id);
    return (await this.clientRepository.remove(client)) ? true : false;
  }
}
