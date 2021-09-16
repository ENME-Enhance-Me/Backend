import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'graphql-upload';
import { CloudinaryService } from 'src/helpers/Cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { Mtag } from '../mtags/entities/mtag.entity';
import { MtagsService } from '../mtags/mtags.service';
import { Question } from '../question/entities/question.entity';
import { QuestionService } from '../question/question.service';
import { CreateQuestionOptionInput } from './dto/create-question-option.input';
import { UpdateQuestionOptionInput } from './dto/update-question-option.input';
import { QuestionOption } from './entities/question-option.entity';

@Injectable()
export class QuestionOptionsService {
  constructor(
    @InjectRepository(QuestionOption)
    private readonly qOptionRepository: Repository<QuestionOption>,
    private readonly questionService: QuestionService,
    private readonly cloudService: CloudinaryService,
    @InjectRepository(Mtag)
    private readonly mtagService: Repository<Mtag>
  ) { }

  async create(data: CreateQuestionOptionInput, image: FileUpload) {
    const question = await this.question(data.questionID);

    if (!question) {
      throw new NotFoundException('questão não encontrada');
    }

    const option = this.qOptionRepository.create({
      description: data.description,
      nextQuestion: data.nextQuestion,
      question
    });

    if (image) {
      const file = await this.cloudService.uploadImage(image, "enme/questionOptionsImage");
      option.image = file.url;
    }

    const optionSaved = await this.qOptionRepository.save(option);

    if (!optionSaved) {
      throw new InternalServerErrorException('Problema ao criar uma opção de pergunta');
    }

    return optionSaved;
  }

  async findAll() {
    return await this.qOptionRepository.find();
  }

  async findOne(id: string) {
    return await this.qOptionRepository.findOne(id);
  }

  async findAllOptionsToQuestion(questionID: string): Promise<QuestionOption[]> {
    const question = await this.question(questionID)

    const options = await this.qOptionRepository.find({
      where: {
        question
      },
    });

    return options;
  }

  async update(id: string, data: UpdateQuestionOptionInput) {
    const option = await this.findOne(id);

    if (!option) {
      throw new NotFoundException('opção de questão não encontrada');
    }
    const mTag = await this.mTag(data.mtagID);

    this.qOptionRepository.merge(option, {
      description: data.description,
      nextQuestion: data.nextQuestion,
      mTag
    });


    const optionUpdated = await this.qOptionRepository.save(option);
    return optionUpdated;
  }

  async remove(id: string) {
    const option = await this.findOne(id);
    let image: string;
    if (option.image) {
      image = this.cloudService.getIDImage(option.image);
      this.cloudService.deleteImage('enme/questionOptionsImage/' + image);
    }
    return (await this.qOptionRepository.remove(option)) ? true : false;
  }

  async question(questionID: string): Promise<Question> {
    return await this.questionService.findOne(questionID);
  }

  async mTag(mtagID: string): Promise<Mtag> {
    let mtag: Mtag;
    if (mtagID) {
      mtag = await this.mtagService.findOneOrFail(mtagID);
    }

    return mtag
  }
}
