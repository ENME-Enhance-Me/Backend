import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateBrandInput } from './dto/create-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private BrandRepository: Repository<Brand>,
    private readonly userService: UserService,
  ) {}

  async create(data: CreateBrandInput) {
    const user = await this.userService.create({
      Email: data.Email,
      UserName: data.UserName,
      Password: data.Password,
    });

    const Brand = this.BrandRepository.create({
      Company_name: data.Company_name,
      CNPJ_CPF: data.CNPJ_CPF,
      user: user,
    });
    const BrandCreated = await this.BrandRepository.save(Brand);

    if (!BrandCreated) {
      throw new InternalServerErrorException('Problemas ao criar uma marca');
    }
    return BrandCreated;
  }

  findAll() {
    return this.BrandRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} brand`;
  }

  update(id: string, data: UpdateBrandInput) {
    return `This action updates a #${data + id} brand`;
  }

  remove(id: string) {
    return `This action removes a #${id} brand`;
  }
}
