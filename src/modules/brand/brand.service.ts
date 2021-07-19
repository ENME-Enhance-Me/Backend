import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'graphql-upload';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
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
    private readonly cloudService: CloudinaryService
  ) { }

  async create(data: CreateBrandInput, avatarBrand: FileUpload, avatarUser: FileUpload): Promise<Brand> {
    let BrandCreated: Brand;

    if (await this.BrandRepository.findOne({ company_name: data.company_name })) {
      throw new BadRequestException('Nome da companhia já cadastrado');
    }
    else if (await this.BrandRepository.findOne({ CNPJ_CPF: data.CNPJ_CPF })) {
      throw new BadRequestException('CPF ou CNPJ já cadastrado');
    }
    else {
      const brand = this.BrandRepository.create({
        company_name: data.company_name,
        CNPJ_CPF: data.CNPJ_CPF
      });

      const user = await this.userService.create({
        email: data.email,
        username: data.username,
        password: data.password,
      }, avatarUser);

      try {
        const file = await this.cloudService.uploadImage(avatarBrand, "enme/avatar");
        brand.logo = file.url;
      }
      catch (err) {
        brand.logo = "https://res.cloudinary.com/enme/image/upload/v1626717618/avatar/user_avatar.png"
      }

      brand.users = new Array<User>();
      brand.users.push(user);
      BrandCreated = await this.BrandRepository.save(brand);
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
        { id: user.brandID },
        { CNPJ_CPF: data.CNPJ_CPF },
        { company_name: data.company_name }
      ],
      relations: ['user']
    });
    if (!brand) {
      throw new NotFoundException('Marca não encontrada');
    }
    return brand;
  }

  async findOne(id: string): Promise<Brand> {
    const brand = await this.BrandRepository.findOne({ where: { id } });
    if (!brand) {
      throw new NotFoundException('Marca não encontrada');
    }
    return brand;
  }

  async update(id: string, data: UpdateBrandInput): Promise<Brand> {
    const brand = await this.findOne(id);
    this.BrandRepository.merge(brand, { ...data });
    const brandUpdated = this.BrandRepository.save(brand);
    return brandUpdated;
  }

  async remove(id: string): Promise<boolean> {
    const brand = await this.findOne(id);
    let avatar: string;
    avatar = this.getIDImage(brand.logo);
    console.log('enme/avatar/' + avatar);
    if (!(avatar === "user_avatar")) {
      this.cloudService.deleteImage('enme/avatar/' + avatar);
    }
    return (await this.BrandRepository.remove(brand)) ? true : false;
  }

  private getIDImage(link: string): string {
    const parts = link.split('/');
    const imageid = parts[parts.length - 1].split('.')[0];
    console.log("imageid " + imageid)
    return imageid

  }
}
