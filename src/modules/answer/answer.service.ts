import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientbrandService } from '../clientbrand/clientbrand.service';
import { Clientbrand } from '../clientbrand/entities/clientbrand.entity';
import { QuestionOption } from '../question-options/entities/question-option.entity';
import { QuestionOptionsService } from '../question-options/question-options.service';
import { CreateAnswerInput } from './dto/create-answer.input';
import { UpdateAnswerInput } from './dto/update-answer.input';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {

  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    private readonly qOptionService: QuestionOptionsService,
    private readonly clientBrandService: ClientbrandService
  ) { }

  async create(data: CreateAnswerInput): Promise<Answer> {
    const qOption = await this.questionOption(data.questionOptionID);

    if (!qOption) {
      throw new NotFoundException('Opção de questão não encontrada');
    }

    const client = await this.client(data.clientID);

    if (!client) {
      throw new NotFoundException('relação cliente com marca não encontrado');
    }

    const answer = this.answerRepository.create({
      description: data.description,
      questionOption: qOption,
      client: client
    });

    const answerSaved = await this.answerRepository.save(answer);

    if (!answerSaved) {
      throw new InternalServerErrorException('Problema ao criar uma resposta');
    }

    return answerSaved;
  }

  async findAll(): Promise<Answer[]> {
    return await this.answerRepository.find();
  }

  async findOne(id: string): Promise<Answer> {
    return await this.answerRepository.findOne(id);
  }

  async findAllToQuestionOption(questionOptionID: string): Promise<Answer[]>{
    const questionOption = await this.questionOption(questionOptionID)

    const answers = await this.answerRepository.find({
      where: {
        questionOption
      },
    });

    return answers;
  }

  async update(id: string, data: UpdateAnswerInput): Promise<Answer> {
    const answer = await this.findOne(id);

    if (!answer) {
      throw new NotFoundException('resposta não encontrada');
    }
    const questionOption = await this.questionOption(data.questionOptionID)
    this.answerRepository.merge(answer, {
      description: data.description,
      questionOption: questionOption
    });
    const answerUpdated = await this.answerRepository.save(answer);
    return answerUpdated;
  }

  async remove(id: string) {
    const option = await this.findOne(id);
    return (await this.answerRepository.remove(option)) ? true : false;
  }

  async questionOption(questionOptionID: string): Promise<QuestionOption> {
    return await this.qOptionService.findOne(questionOptionID);
  }
  async client(clientID: string): Promise<Clientbrand> {
    return await this.clientBrandService.findOne(clientID);
  }
}
