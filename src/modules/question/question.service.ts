import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'graphql-upload';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
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
    private readonly researchService: ResearchService,
    private readonly cloudService: CloudinaryService
  ) { }

  async create(data: CreateQuestionInput, image?: FileUpload, imageString?: string) {
    const research = await this.research(data.researchID);
    const type = await this.questionType(data.qtypeID);
    if (!type) {
      throw new NotFoundException('tipo de questão não encontrada');
    }

    const question = this.questionRepository.create({
      numberQuestion: (research.questions.length + 1),
      description: data.description,
      research,
      questionType: type
    });
    if (image) {
      try {
        const file = await this.cloudService.uploadImage(image, "enme/questionImage");
        question.image = file.url;
      }
      catch (err) {
        question.image = "https://res.cloudinary.com/enme/image/upload/v1629924117/enme/questionImage/padrao/banner-azul.jpg";
      }
    }
    else if (imageString) {
      question.image = imageString;
    }

    const questionSaved = await this.questionRepository.save(question);

    if (!questionSaved) {
      throw new InternalServerErrorException('Problema ao criar uma pergunta');
    }

    return questionSaved;
  }


  async createQuestionType(type: string) {
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

    const questions = await this.questionRepository.find({
      where: {
        research
      },
    });

    return questions;
  }

  async findOne(id: string): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: {
        id
      },
      relations: ['research', 'questionType']
    });
    if (!question) {
      throw new NotFoundException('questão não encontrada');
    }
    return question;
  }

  async update(id: string, data: UpdateQuestionInput): Promise<Question> {
    const question = await this.findOne(id);

    if (!question) {
      throw new NotFoundException('questão não encontrada');
    }
    if (data.qtypeID) {
      const questionType = await this.questionType(data.qtypeID);
      this.questionRepository.merge(question, {
        description: data.description,
        questionType
      });
    }
    else {
      this.questionRepository.merge(question, {
        description: data.description
      });
    }

    const questionUpdated = await this.questionRepository.save(question);
    return questionUpdated;
  }

  async remove(id: string): Promise<Boolean> {
    const question = await this.findOne(id);
    let image: string;
    image = this.cloudService.getIDImage(question.image);
    if (!(image === "banner-azul")) {
      this.cloudService.deleteImage('enme/questionImage/' + image);
    }
    return (await this.questionRepository.remove(question)) ? true : false;
  }

  async research(researchID: string): Promise<Research> {
    return await this.researchService.findOne(researchID);
  }

  async questionType(qtypeID: string): Promise<QuestionType> {
    return await this.qtypeRepository.findOne(qtypeID);
  }
}
