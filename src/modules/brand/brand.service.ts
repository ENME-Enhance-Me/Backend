import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';
import { CreateBrandInput } from './dto/create-brand.input';
import { FindBrandInput } from './dto/find-brand.input';
import { UpdateBrandInput } from './dto/update-brand.input';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private BrandRepository: Repository<Brand>,
    private readonly userService: UserService,
  ) { }

  async create(data: CreateBrandInput): Promise<Brand> {
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

  findAll(): Promise<Brand[]> {
    return this.BrandRepository.find();
  }

  async find(data: FindBrandInput): Promise<Brand> {
    let user = undefined;
    if (data.UserId ||data.Email || data.UserName) {
      user = await this.userService.find({ 
        UserId: data.UserId, 
        Email: data.Email, 
        UserName: data.UserName 
      });
    }
    return this.BrandRepository.findOne({
      where: [
        { id: data.brandID },
        { CNPJ_CPF: data.CNPJ_CPF },
        { Company_name: data.Company_name },
        { user: user }
      ]
    });
  }

  async findOne(id: string): Promise<Brand> {
    return await this.BrandRepository.findOneOrFail(id);
  }

  async update(id: string, data: UpdateBrandInput): Promise<Brand> {
    const brand = await this.findOne(id);

    this.BrandRepository.merge(brand, { ...data });
    const brandUpdated = this.BrandRepository.save(brand);
    return brandUpdated;
  }

  async remove(id: string) {
    const brand = await this.findOne(id);
    const user = await this.userService.remove(brand.userId);
    return (await this.BrandRepository.remove(brand)) ? true : false;
  }
}
