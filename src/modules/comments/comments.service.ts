import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResearchService } from '../research/research.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';
@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly researchService: ResearchService
  ) { }

  async create(data: CreateCommentInput) {
    const research = await this.research(data.researchID);

    if (!research) {
      throw new NotFoundException('pesquisa não encontrada');
    }

    const comment = this.commentRepository.create({
      text: data.text,
      research: research,
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

  async findAllToResearch(researchID: string): Promise<Comment[]>{
    const research = await this.researchService.findOne(researchID)

    const comment = await this.commentRepository.find({
      where: {
        research
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
    if(data.researchID){
      const research = await this.research(data.researchID);
      update = {
        text: data.text,
        research: research,
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

  async research(researchID: string){
    return await this.researchService.findOne(researchID);
  }
}
