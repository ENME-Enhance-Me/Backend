import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'graphql-upload';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { BrandService } from '../brand/brand.service';
import { Brand } from '../brand/entities/brand.entity';
import { CreateRewardInput } from './dto/create-reward.input';
import { UpdateRewardInput } from './dto/update-reward.input';
import { Reward } from './entities/reward.entity';

@Injectable()
export class RewardService {

  constructor(
    @InjectRepository(Reward)
    private readonly rewardRepository: Repository<Reward>,
    private readonly brandService: BrandService,
    private readonly cloudService: CloudinaryService,
  ) { }

  async create(data: CreateRewardInput, image?: FileUpload, imageString?: string) {
    const brand = await this.brand(data.brandID);

    const reward = this.rewardRepository.create({
      name: data.name,
      description: data.description,
      brand: brand,
      type: data.type
    });

    
    if (image) {
      const file = await this.cloudService.uploadImage(image, "enme/rewards");
      reward.image = file.url;
    }
    else if (imageString){
      reward.image = imageString;
    }

    const rewardSaved = await this.rewardRepository.save(reward);

    if (!rewardSaved) {
      throw new InternalServerErrorException('Problema ao criar uma recompensa');
    }

    return rewardSaved;
  }

  async findAllToBrand(brandID: string): Promise<Reward[]> {
    const brand = await this.brand(brandID);

    const reward = await this.rewardRepository.find({
      where: {
        brand
      },
    });
    
    return reward;
  }

  async findAll() {
    return await this.rewardRepository.find();
  }

  async findOne(id: string) {
    return await this.rewardRepository.findOneOrFail({
      where: {
        id
      },
      relations: ['brand']
    });
  }

  async update(id: string, data: UpdateRewardInput) {
    const reward = await this.findOne(id);
    
    if(!reward){
      throw new NotFoundException('recompensa não encontrada não encontrada');
    }
    this.rewardRepository.merge(reward, {...data});
    const rewardUpdated = await this.rewardRepository.save(reward);
    return rewardUpdated;
  }

  async remove(id: string) {
    const reward = await this.findOne(id);
    let image: string;
    if (reward.image) {
      image = this.cloudService.getIDImage(reward.image);
      this.cloudService.deleteImage('enme/rewards/' + image);
    }
    return (await this.rewardRepository.remove(reward)) ? true : false;
  }

  async brand(brandID: string): Promise<Brand> {
    return await this.brandService.find({brandID});
  }
}
