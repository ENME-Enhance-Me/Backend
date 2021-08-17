import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MacroSegment } from '../macro-segments/entities/macro-segment.entity';
import { MacroSegmentsService } from '../macro-segments/macro-segments.service';
import { CreateMicroSegmentInput } from './dto/create-micro-segment.input';
import { UpdateMicroSegmentInput } from './dto/update-micro-segment.input';
import { MicroSegment } from './entities/micro-segment.entity';

@Injectable()
export class MicroSegmentsService {
  constructor(
    @InjectRepository(MicroSegment)
    private readonly microSegmentRepository: Repository<MicroSegment>,
    @InjectRepository(MacroSegment)
    private readonly macroSegmentRepository: Repository<MacroSegment>,
  ) { }
  async create(data: CreateMicroSegmentInput) {

    let microSegment = this.microSegmentRepository.create({
      name: data.name,
      macroSegments: []
    });
    let segmentCreated = await this.microSegmentRepository.save(microSegment);
    if (!segmentCreated) {
      throw new InternalServerErrorException('Erro ao criar um MicroSegmento');
    }

    data.MacroIDs.forEach(async (macroID) => {
      try {
        const macroSegment = await this.macroSegmentRepository.findOne(macroID);
        segmentCreated.macroSegments.push(macroSegment);
      }
      catch (err) {
        console.log('erro no macroID => ' + macroID);
      }
    });

    segmentCreated = await this.microSegmentRepository.save(segmentCreated);

    return segmentCreated;
  }

  async findAll(): Promise<MicroSegment[]> {
    return await this.microSegmentRepository.find({
      relations: ['macroSegments']
    });
  }

  async findAlltoMacro(macroID: string) {
    const micros = await this.microSegmentRepository.find({
      relations: ['macroSegments']
    });

    return micros.filter((micro) => {
      for (var i = 0; i < micro.macroSegments.length; i++) {
        if (micro.macroSegments[i].id === macroID)
          return micro;
      }
    })
  }

  

  async findOne(id: string): Promise<MicroSegment> {
    const micro = await this.microSegmentRepository.findOneOrFail(id);
    return micro;
  }

  async update(id: string, data: UpdateMicroSegmentInput) {
    const microSegment = await this.microSegmentRepository.findOne({
      where: { id },
      relations: ['macroSegments']
    });
    if (!microSegment) {
      throw new NotFoundException('MicroSegmento não encontrado');
    }
    this.microSegmentRepository.merge(microSegment, { ...data });
    await this.microSegmentRepository.save(microSegment);

    return microSegment;
  }

  async remove(id: string) {
    const microSegment = await this.microSegmentRepository.findOne({
      where: { id }
    });
    if (!microSegment) {
      throw new NotFoundException('MicroSegmento não encontrado');
    }

    return (await this.microSegmentRepository.remove(microSegment)) ? true : false;
  }
}

