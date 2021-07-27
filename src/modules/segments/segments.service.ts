import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSegmentInput } from './dto/create-segment.input';
import { UpdateSegmentInput } from './dto/update-segment.input';
import { Segment } from './entities/segment.entity';

@Injectable()
export class SegmentsService {

  constructor(
    @InjectRepository(Segment)
    private readonly segmentRepository: Repository<Segment>
  ) { }

  async createMacro(data: CreateSegmentInput): Promise<Segment> {
    const segment = this.segmentRepository.create({
      name: data.name
    });

    const segmentCreated = await this.segmentRepository.save(segment);
    if (!segmentCreated) {
      throw new InternalServerErrorException('Erro ao criar segmento');
    }
    return segmentCreated;
  }

  async createMicros(macroID: string, data: CreateSegmentInput[]): Promise<Segment> {
    const macroSegment = await this.findOne(macroID);
    if (!macroSegment.microSegments) {
      macroSegment.microSegments = new Array<Segment>();
    }

    data.forEach(async micro => {
      const segment = this.segmentRepository.create({
        name: micro.name,
        macroSegment
      });
      await this.segmentRepository.save(segment);
    });

    macroSegment.microSegments = await this.findAllMicro(macroSegment);
    if (!macroSegment) {
      throw new InternalServerErrorException('Erro ao criar segmento');
    }
    return macroSegment;
  }

  async findAllMicro(macro: Segment): Promise<Segment[]> {
    return await this.segmentRepository.find({
      macroSegment: macro
    });
  }

  async findAllMacro(): Promise<Segment[]> {
    return await this.segmentRepository.find({
      where: { macroSegment: null }
    });
  }

  async findAll(): Promise<Segment[]> {
    return await this.segmentRepository.find();
  }

  async findOne(id: string): Promise<Segment> {
    const segment = await this.segmentRepository.findOne({
      where: { id }
    });
    if (!segment) {
      throw new NotFoundException('Segmento não encontrado');
    }
    return segment;
  }

  async update(id: string, data: UpdateSegmentInput): Promise<Segment> {
    const segment = await this.segmentRepository.findOne({
      where: id
    });
    if (!segment) {
      throw new NotFoundException('Segmento não encontrado');
    }
    this.segmentRepository.merge(segment, { ...data });
    await this.segmentRepository.save(segment);

    return segment;
  }

  async remove(id: string): Promise<boolean> {
    const segment = await this.segmentRepository.findOne({
      where: { id }
    });
    if (!segment) {
      throw new NotFoundException('Segmento não encontrado');
    }

    return (await this.segmentRepository.remove(segment)) ? true : false;
  }
}
