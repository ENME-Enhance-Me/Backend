import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandService } from "../brand/brand.service";
import { MtagsService } from "../mtags/mtags.service";
import { QuestionOption } from "../question-options/entities/question-option.entity";
import { QuestionOptionsService } from "../question-options/question-options.service";
import { Question } from "../question/entities/question.entity";
import { QuestionService } from "../question/question.service";
import { RewardService } from "../reward/reward.service";
import { CreateCompleteResearchInput } from "./dto/create-complete-research.input";
import { Research } from "./entities/research.entity";
import { ResearchService } from "./research.service";


@Injectable()
export class CreateResearchService {
    constructor(
        private readonly questionService: QuestionService,
        private readonly optionsService: QuestionOptionsService,
        private readonly researchService: ResearchService,
        private readonly rewardService: RewardService,
        private readonly mtagService: MtagsService,
    ) { }

    async create(data: CreateCompleteResearchInput): Promise<Research> {
        const research = await this.researchService.create({
            name: data.name,
            description: "",
            startDate: data.startDate,
            finishDate: data.finishDate,
            brandID: data.brandID,
            peopleGroup: data.peopleGroup
        });
        if (!research.questions) {
            research.questions = new Array<Question>();
        }
        data.questions.forEach(async (question) => {
            const qs = await this.questionService.create({
                description: question.description,
                qtypeID: question.qtypeID,
                researchID: research.id
            },
                null);
            if(!qs.options){
                qs.options = new Array<QuestionOption>();
            }
            question.options.forEach(async (option) => {
                const op = await this.optionsService.create({
                    description: option.description,
                    nextQuestion: option.nextQuestion,
                    mtagID: option.mtagID,
                    questionID: qs.id
                }, null);
                
                qs.options.push(op);
            });
            research.questions.push(qs);
        });

        const reward = await this.rewardService.create({
            brandID: data.brandID,
            name: data.reward.name,
            description: data.reward.description,  
        }, null)
        //research.brand.rewards.push(reward);
        return research;
    }
}