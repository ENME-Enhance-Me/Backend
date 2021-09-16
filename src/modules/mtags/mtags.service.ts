import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandService } from '../brand/brand.service';
import { QuestionOptionsService } from '../question-options/question-options.service';
import { ResearchService } from '../research/research.service';
import { CreateMtagInput } from './dto/create-mtag.input';
import { UpdateMtagInput } from './dto/update-mtag.input';
import { Mtag } from './entities/mtag.entity';

@Injectable()
export class MtagsService {

  constructor(
    @InjectRepository(Mtag)
    private readonly mtagRepository: Repository<Mtag>,
    private readonly qOptionService: QuestionOptionsService,
    private readonly brandService: BrandService,
    private readonly researchService: ResearchService,
  ) { }

  async create(data: CreateMtagInput) {
    const brand = await this.brand(data.brandID);

    if (!brand) {
      throw new NotFoundException('Marca não encontrada');
    }

    const mTag = this.mtagRepository.create({
      tag: data.tag,
      brand
    });

    const mTagSaved = await this.mtagRepository.save(mTag);

    if (!mTagSaved) {
      throw new InternalServerErrorException('Problema ao criar uma mTag');
    }

    return mTagSaved;
  }

  async findAll() {
    return await this.mtagRepository.find();
  }

  async findAllToBrand(brandID: string): Promise<Mtag[]> {
    const brand = await this.brandService.findOne(brandID)

    const mTags = await this.mtagRepository.find({
      where: {
        brand
      },
    });

    return mTags;
  }

  async findOne(id: string) {
    return await this.mtagRepository.findOne(id);
  }

  async update(id: string, data: UpdateMtagInput) {
    const mTag = await this.findOne(id);

    if (!mTag) {
      throw new NotFoundException('mTag não encontrada');
    }
    this.mtagRepository.merge(mTag, {
      tag: data.tag
    });

    const mtagUpdated = await this.mtagRepository.save(mTag);
    return mtagUpdated;
  }

  async remove(id: string) {
    const mTag = await this.findOne(id);
    return (await this.mtagRepository.remove(mTag)) ? true : false;
  }

  async brand(brandID: string) {
    return await this.brandService.findOne(brandID);
  }

  async findAllToResearch(researchID: string){
    const research = await this.researchService.findOne(researchID);

    const mtags = new Array<Mtag>();

    research.questions.forEach((question) => {
      question.options.forEach((option) => {
        if(option.mTag){
          mtags.push(option.mTag);
        }
      });
    });

    return mtags;
  }
}
