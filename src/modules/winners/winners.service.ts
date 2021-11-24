import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/entities/client.entity';
import { Reward } from '../reward/entities/reward.entity';
import { RewardService } from '../reward/reward.service';
import { CreateWinnerInput } from './dto/create-winner.input';
import { UpdateWinnerInput } from './dto/update-winner.input';
import { Winner } from './entities/winner.entity';

@Injectable()
export class WinnersService {

  constructor(
    @InjectRepository(Winner)
    private readonly winnerRepository: Repository<Winner>,
    private readonly rewardService: RewardService,
    private readonly clientService: ClientsService,
  ) {}

  async create(data: CreateWinnerInput) {
    const client = await this.client(data.clientID);
    const reward = await this.reward(data.rewardId);

    if(!reward){
      throw new NotFoundException('Recompensa não encontrada');
    }

    const winner = this.winnerRepository.create({
      client,
      reward,
    });

    const winnerSaved = await this.winnerRepository.save(winner);

    if(!winnerSaved){
      throw new InternalServerErrorException('Problemas ao relacionar cliente e recompensa');
    }

    return winnerSaved;
  }

  async findAll() {
    return await this.winnerRepository.find();
  }

  async findOne(id: string) {
    return await this.winnerRepository.findOneOrFail({
      where: {
        id
      },
      relations: ['reward', 'client', 'client.user'],
    });;
  }

  async update(id: string, data: UpdateWinnerInput) {
    const winner = await this.findOne(id);
    
    if(!winner){
      throw new NotFoundException('relação cliente e recompensa não encontrada');
    }
    this.winnerRepository.merge(winner, {...data});
    const winnerUpdated = await this.winnerRepository.save(winner);
    return winnerUpdated;
  }

  async remove(id: string) {
    const winner = await this.findOne(id);
    // let image: string;
    // if (winner.qrCode) {
    //   image = this.cloudService.getIDImage(winner.image);
    //   this.cloudService.deleteImage('enme/qrCode/' + image);
    // }
    return (await this.winnerRepository.remove(winner)) ? true : false;
  }
  async reward(rewardID: string): Promise<Reward> {
    return await this.rewardService.findOne(rewardID);
  }
  async client(clientID: string): Promise<Client> {
    return await this.clientService.find({clientID});
  }
}
