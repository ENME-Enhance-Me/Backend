import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateClientInput } from './dto/create-client.input';
import { FindClientInput } from './dto/find-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private readonly userService: UserService,
  ) { }
  async create(data: CreateClientInput) {
    const user = await this.userService.create({
      email: data.email,
      username: data.username,
      password: data.password,
    });

    const client = this.clientRepository.create({
      firstname: data.firstname,
      lastname: data.lastname,
      birthdate: data.birthdate,
      gender: data.gender,
      reputation: 0,
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
  /*
  *   encontra um cliente pelos campos de usuario ou id de cliente ou firstName e LastName juntos
  */
  async find(data: FindClientInput): Promise<Client> {
    let user = undefined;
    if (data.userID || data.email || data.username) {
      user = await this.userService.find({
        userID: data.userID,
        email: data.email,
        username: data.username
      });
    }
    return this.clientRepository.findOne({
      where: [
        { id: data.clientID },
        {
          firstname: data.firstname,
          lastname: data.lastname
        },
        { user: user }
      ]
    });
  }

  async update(id: string, data: UpdateClientInput): Promise<Client> {
    const client = await this.findOne(id);
    const user = await this.userService.find({ userID: client.userID })

    await this.userService.update(user.id, {
      email: data.email,
      password: data.password,
      username: data.username
    });
    this.clientRepository.merge(client, { ...data });
    const clientUpdated = this.clientRepository.save(client);
    return clientUpdated;
  }

  async remove(id: string) {
    const client = await this.findOne(id);
    await this.userService.remove(client.user.id);
    return (await this.clientRepository.remove(client)) ? true : false;
  }
}
