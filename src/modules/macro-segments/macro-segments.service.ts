import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MicroSegment } from '../micro-segments/entities/micro-segment.entity';
import { MicroSegmentsService } from '../micro-segments/micro-segments.service';
import { CreateMacroSegmentInput } from './dto/create-macro-segment.input';
import { UpdateMacroSegmentInput } from './dto/update-macro-segment.input';
import { MacroSegment } from './entities/macro-segment.entity';

@Injectable()
export class MacroSegmentsService {
  constructor(
    @InjectRepository(MacroSegment)
    private readonly macroSegmentRepository: Repository<MacroSegment>,
    @InjectRepository(MicroSegment)
    private readonly microSegmentRepository: Repository<MicroSegment>
  ) { }

  async create(data: CreateMacroSegmentInput) {

    const macroSegment = this.macroSegmentRepository.create({
      name: data.name,
      microSegments: []
    });
    let segmentCreated = await this.macroSegmentRepository.save(macroSegment);
    if (!segmentCreated) {
      throw new InternalServerErrorException('Erro ao criar um MacroSegmento');
    }

    if (data.MicroIDs) {
      data.MicroIDs.forEach(async (microID) => {
        try {
          const microSegment = await this.microSegmentRepository.findOne(microID);
          segmentCreated.microSegments.push(microSegment);
        }
        catch (err) {
          console.log('erro no macroID => ' + microID);
        }
      });
      segmentCreated = await this.macroSegmentRepository.save(segmentCreated);
    }

    return segmentCreated;
  }

  async findAll(): Promise<MacroSegment[]> {
    return await this.macroSegmentRepository.find();
  }

  async findOne(id: string): Promise<MacroSegment> {
    let macro: MacroSegment;
    try {
      macro = await this.macroSegmentRepository.findOneOrFail({
        where: {
          id
        },
        relations: [ 'microSegments']
      });
    }
    catch (err) {
      throw new NotFoundException('MacroSegmento não encontrado');
    }
    return macro;
  }

  async update(id: string, data: UpdateMacroSegmentInput) {
    const macroSegment = await this.macroSegmentRepository.findOne({
      where: { id }
    });
    if (!macroSegment) {
      throw new NotFoundException('MacroSegmento não encontrado');
    }
    this.macroSegmentRepository.merge(macroSegment, { ...data });
    await this.macroSegmentRepository.save(macroSegment);

    return macroSegment;
  }

  async remove(id: string): Promise<boolean> {
    const macroSegment = await this.macroSegmentRepository.findOne({
      where: { id }
    });
    if (!macroSegment) {
      throw new NotFoundException('MacroSegmento não encontrado');
    }

    return (await this.macroSegmentRepository.remove(macroSegment)) ? true : false;
  }

  async connectMicrosToMacro(macroID: string, microIDs: string[]) {
    const macro = await this.findOne(macroID);
    microIDs.forEach(async (microID) => {
      try {
        const microSegment = await this.microSegmentRepository.findOne(microID);
        macro.microSegments.push(microSegment);
      }
      catch (err) {
        console.log('erro no macroID => ' + microID);
      }
    });
    const macroAtt = await this.macroSegmentRepository.save(macro);
    return macroAtt;
  }
}
