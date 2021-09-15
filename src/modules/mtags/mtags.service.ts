import { Injectable } from '@nestjs/common';
import { CreateMtagInput } from './dto/create-mtag.input';
import { UpdateMtagInput } from './dto/update-mtag.input';

@Injectable()
export class MtagsService {
  create(createMtagInput: CreateMtagInput) {
    return 'This action adds a new mtag';
  }

  findAll() {
    return `This action returns all mtags`;
  }

  findOne(id: string) {
    return `This action returns a #${id} mtag`;
  }

  update(id: string, updateMtagInput: UpdateMtagInput) {
    return `This action updates a #${id} mtag`;
  }

  remove(id: string) {
    return `This action removes a #${id} mtag`;
  }
}
