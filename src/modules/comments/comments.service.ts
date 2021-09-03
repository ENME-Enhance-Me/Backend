import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerService } from '../answer/answer.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';
@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly answerService: AnswerService
  ) { }

  async create(data: CreateCommentInput) {
    const answer = await this.answer(data.answerID);
    const qOption = await this.answerService.questionOption(answer.questionOptionID);

    if (!answer) {
      throw new NotFoundException('Resposta não encontrada');
    }

    const comment = this.commentRepository.create({
      text: data.text,
      answer,
      questionOption: qOption
    });

    const commentSaved = await this.commentRepository.save(comment);

    if (!commentSaved) {
      throw new InternalServerErrorException('Problema ao criar um comentário');
    }

    return commentSaved;
  }

  async findAll() {
    return await this.commentRepository.find();
  }

  async findOne(id: string) {
    return await this.commentRepository.findOne(id);
  }

  async findAllToQuestionOption(questionOptionID: string): Promise<Comment[]>{
    const questionOption = await this.answerService.questionOption(questionOptionID)

    const comment = await this.commentRepository.find({
      where: {
        questionOption
      },
    });

    return comment;
  }

  async update(id: string, data: UpdateCommentInput) {
    const comment = await this.findOne(id);

    if (!comment) {
      throw new NotFoundException('resposta não encontrada');
    }
    let update:any = {
      text: data.text
    }
    if(data.answerID){
      const answer = await this.answer(data.answerID);
      const questionOption = await this.answerService.questionOption(answer.questionOptionID);
      update = {
        text: data.text,
        answer: answer,
        questionOption: questionOption
      }
    }
    this.commentRepository.merge(comment, update);

    const commentUpdated = await this.commentRepository.save(comment);
    return commentUpdated;
  }

  async remove(id: string) {
    const comment = await this.findOne(id);
    return (await this.commentRepository.remove(comment)) ? true : false;
  }

  async answer(answerID: string){
    return await this.answerService.findOne(answerID);
  }

  async questionOption(questionOpitionID: string){
    return await this.answerService.questionOption(questionOpitionID);
  }
}
