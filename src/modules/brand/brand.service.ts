import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'graphql-upload';
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

  async create(data: CreateBrandInput, avatar: FileUpload): Promise<Brand> {
    let BrandCreated: Brand;

    if (await this.BrandRepository.findOne({ company_name: data.company_name })) {
      throw new BadRequestException('Nome da companhia já cadastrado');
    } 
    else if (await this.BrandRepository.findOne({ CNPJ_CPF: data.CNPJ_CPF })) {
      throw new BadRequestException('CPF ou CNPJ já cadastrado');
    } 
    else {
      const user = await this.userService.create({
        email: data.email,
        username: data.username,
        password: data.password,
      }, avatar);

      const Brand = this.BrandRepository.create({
        company_name: data.company_name,
        CNPJ_CPF: data.CNPJ_CPF,
        user: user,
      });
      BrandCreated = await this.BrandRepository.save(Brand);
      if (!BrandCreated) {
        await this.userService.remove(user.id);
        throw new InternalServerErrorException('Problemas ao criar uma marca');
      }
    }

    return BrandCreated;
  }

  findAll(): Promise<Brand[]> {
    return this.BrandRepository.find();
  }

  async find(data: FindBrandInput): Promise<Brand> {
    let user = undefined;
    if (data.userID || data.email || data.username) {
      user = await this.userService.find({
        userID: data.userID,
        email: data.email,
        username: data.username
      });
    }
    const brand = this.BrandRepository.findOne({
      where: [
        { id: data.brandID },
        { CNPJ_CPF: data.CNPJ_CPF },
        { company_name: data.company_name },
        { user: user }
      ],
      relations: ['user']
    });
    if (!brand) {
      throw new NotFoundException('Marca não encontrada');
    }
    return brand;
  }

  async findOne(id: string): Promise<Brand> {
    const brand = await this.BrandRepository.findOne(id,
      {
        relations: ['user']
      });
    if (!brand) {
      throw new NotFoundException('Marca não encontrada');
    }
    return brand;
  }

  async update(id: string, data: UpdateBrandInput): Promise<Brand> {
    const brand = await this.findOne(id);
    const user = await this.userService.find({ userID: brand.userID })
    await this.userService.update(user.id, {
      email: data.email,
      password: data.password,
      username: data.username
    });
    this.BrandRepository.merge(brand, { ...data });
    const brandUpdated = this.BrandRepository.save(brand);
    return brandUpdated;
  }

  async remove(id: string) {
    const brand = await this.findOne(id);
    await this.userService.remove(brand.userID);
    return (await this.BrandRepository.remove(brand)) ? true : false;
  }
}
