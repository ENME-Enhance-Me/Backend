import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandService } from '../brand/brand.service';
import { Brand } from '../brand/entities/brand.entity';
import PeopleGroup, { PeopleGroupEnum } from '../user/entities/people-group.entity';
import { CreateResearchInput } from './dto/create-research.input';
import { UpdateResearchInput } from './dto/update-research.input';
import { Research } from './entities/research.entity';

@Injectable()
export class ResearchService {
  constructor(
    @InjectRepository(Research)
    private readonly researchRepository: Repository<Research>,
    @InjectRepository(PeopleGroup)
    private readonly pgRepository: Repository<PeopleGroup>,
    private readonly brandService: BrandService
  ) { }
  async create(data: CreateResearchInput): Promise<Research> {
    const brand = await this.brandService.find({ brandID: data.brandID });

    const research = this.researchRepository.create({
      name: data.name,
      startDate: data.startDate,
      finishDate: data.finishDate,
      ageGroupStart: data.ageGroupStart,
      ageGroupEnd: data.ageGroupEnd,
      locationRange: data.locationRange,
      brand: brand
    });
    const researchSaved = await this.researchRepository.save(research);
    if (!researchSaved) {
      throw new InternalServerErrorException('Problema ao criar uma pesquisa');
    }
    let researchWithPG = await this.linkPeopleGroup(researchSaved, data.peopleGroup);


    return researchWithPG;
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
    return await this.researchRepository.find({
      relations: ['peopleGroups', 'brand', 'questions', 'questions.options', 'questions.options.mTag']
    });
  }

  async brand(brandID: string): Promise<Brand> {
    return await this.brandService.find({ brandID });
  }
  async findOne(id: string) {
    const research = await this.researchRepository.findOneOrFail({
      where: {
        id
      },
      relations: ['peopleGroups', 'brand', 'questions', 'questions.options', 'questions.options.mTag']
    });
    if (!research) {
      throw new NotFoundException('pesquisa não encontrada');
    }
    return research;
  }

  async update(id: string, data: UpdateResearchInput) {

    const research = await this.findOne(id);

    if (!research) {
      throw new NotFoundException('pesquisa não encontrada');
    }
    this.researchRepository.merge(research, { ...data });
    const researchUpdated = await this.researchRepository.save(research);
    return researchUpdated;
  }

  async remove(id: string) {
    const research = await this.findOne(id);

    return (await this.researchRepository.remove(research)) ? true : false;
  }

  async linkPeopleGroup(research: Research, data: PeopleGroupEnum[]) {
    research.peopleGroups = new Array<PeopleGroup>();

    data.forEach(async (pg) => {
      try {
        const newpg = await this.pgRepository.findOne(pg);
        research.peopleGroups.push(newpg);
      }
      catch (err) {
        console.log('erro no peopleGroupID para a pesquisa => ' + pg);
      }
    });
    const resesarchUpdated = await this.researchRepository.save(research);
    return resesarchUpdated;
  }
}
