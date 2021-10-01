import { Injectable } from '@nestjs/common';
import { CreateClientbrandInput } from './dto/create-clientbrand.input';
import { UpdateClientbrandInput } from './dto/update-clientbrand.input';

@Injectable()
export class ClientbrandService {
  create(createClientbrandInput: CreateClientbrandInput) {
    return 'This action adds a new clientbrand';
  }

  findAll() {
    return `This action returns all clientbrand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientbrand`;
  }

  update(id: number, updateClientbrandInput: UpdateClientbrandInput) {
    return `This action updates a #${id} clientbrand`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientbrand`;
  }
}
