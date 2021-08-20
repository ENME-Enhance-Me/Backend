import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandService } from '../brand/brand.service';
import { Brand } from '../brand/entities/brand.entity';
import { CreateResearchInput } from './dto/create-research.input';
import { UpdateResearchInput } from './dto/update-research.input';
import { Research } from './entities/research.entity';

@Injectable()
export class ResearchService {
  constructor(
    @InjectRepository(Research)
    private readonly researchRepository: Repository<Research>,
    private readonly brandService: BrandService
    ){}
  async create(data: CreateResearchInput): Promise<Research> {
    const brand = await this.brandService.find({brandID: data.brandID});

    const research = this.researchRepository.create({
      name: data.name,
      description: data.description,
      brand: brand
    });
    const researchSaved = await this.researchRepository.save(research);

    if (!researchSaved) {
      throw new InternalServerErrorException('Problema ao criar uma pesquisa');
    }

    return researchSaved;
  }

  async findAllToBrand(brandID: string): Promise<Research[]> {
    const brand = await this.brand(brandID);

    const research = await this.researchRepository.find({
      where: {
        brand
      },
    });
    
    return research;
  }

  async findAll(): Promise<Research[]> {
    return await this.researchRepository.find();
  }

  async brand(brandID: string): Promise<Brand> {
    return await this.brandService.find({brandID});
  }
  async findOne(id: string) {
    const research = await this.researchRepository.findOneOrFail({
      where: {
        id
      },
      relations: ['brand']
    });
    if(!research){
      throw new NotFoundException('pesquisa não encontrada')
    }
    return research;
  }

  update(id: string, data: UpdateResearchInput) {
    return `This action updates a #${id} research`;
  }

  remove(id: string) {
    return `This action removes a #${id} research`;
  }
}
