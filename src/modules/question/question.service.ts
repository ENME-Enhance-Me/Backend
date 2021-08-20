import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Research } from '../research/entities/research.entity';
import { ResearchService } from '../research/research.service';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { QuestionType } from './entities/question-type.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(QuestionType)
    private readonly qtypeRepository: Repository<QuestionType>,
    private readonly researchService: ResearchService
  ) { }

  async create(data: CreateQuestionInput) {
    const research = await this.research(data.researchID);
    const type = await this.questionType(data.qtypeID);
    if(!type){
      throw new NotFoundException('tipo de questão não encontrada');
    }

    const question = this.questionRepository.create({
      numberQuestion: (research.questions.length + 1),
      description: data.description,
      research,
      questionType: type
    });
    const questionSaved = await this.questionRepository.save(question);

    if (!questionSaved) {
      throw new InternalServerErrorException('Problema ao criar uma pergunta');
    }

    return questionSaved;
  }


  async createQuestionType(type: string){
    const questionType = this.qtypeRepository.create({
      type
    });
    const questionTypeSaved = await this.qtypeRepository.save(questionType);
    if (!questionTypeSaved) {
      throw new InternalServerErrorException('Problema ao criar um tipo pergunta');
    }

    return questionTypeSaved;
  }

  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find();
  }

  async findAllTipos(): Promise<QuestionType[]> {
    return await this.qtypeRepository.find();
  }

  async findAlltoResearch(researchID: string): Promise<Question[]> {
    const research = await this.researchService.findOne(researchID)

    const question = await this.questionRepository.find({
      where: {
        research
      },
    });

    return question;
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: {
        id
      },
      relations: ['research', 'questionType']
    });
    if(!question){
      throw new NotFoundException('questão não encontrada');
    }
    return question;
  }

  async update(id: string, data: UpdateQuestionInput): Promise<Question> {
    const question = await this.findOne(id);
    
    if(!question){
      throw new NotFoundException('questão não encontrada');
    }
    if(data.qtypeID){
      const questionType = await this.questionType(data.qtypeID);
      this.questionRepository.merge(question, {
        description: data.description,
        questionType
      });
    }
    else{
      this.questionRepository.merge(question, {
        description: data.description
      });
    }
    
    const questionUpdated = await this.questionRepository.save(question);
    return questionUpdated;
  }

  async remove(id: string): Promise<Boolean> {
    const research = await this.findOne(id);
    
    return (await this.questionRepository.remove(research))? true: false;
  }

  async research(researchID: string): Promise<Research> {
    return await this.researchService.findOne(researchID);
  }

  async questionType(qtypeID: string): Promise<QuestionType> {
    return await this.qtypeRepository.findOne(qtypeID);
  }
}