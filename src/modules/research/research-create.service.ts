import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandService } from "../brand/brand.service";
import { MtagsService } from "../mtags/mtags.service";
import { QuestionOptionsService } from "../question-options/question-options.service";
import { QuestionService } from "../question/question.service";
import { CreateCompleteResearchInput } from "./dto/create-complete-research.input";
import { Research } from "./entities/research.entity";
import { ResearchService } from "./research.service";


@Injectable()
export class CreateResearchService {
    constructor(
        private readonly questionService: QuestionService,
        private readonly optionsService: QuestionOptionsService,
        private readonly researchService: ResearchService,
        private readonly mtagService: MtagsService,
        private readonly brandService: BrandService
    ) { }

    async create(data: CreateCompleteResearchInput): Promise<Research>{
        const research = new Research();

        return research;
    }
}