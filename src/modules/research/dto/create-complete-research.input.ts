import { InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { QuestionResearchInput } from 'src/modules/question/dto/question-research.input';
import { RewardResearchInput } from 'src/modules/reward/dto/reward-research.input';
import { PeopleGroupEnum } from 'src/modules/user/entities/people-group.entity';
import { PeopleGroupInput } from './peoplegroup.input';

@InputType()
export class CreateCompleteResearchInput {

    @IsString()
    @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
    name: string;

    @IsDate()
    @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
    startDate: Date;

    @IsDate()
    @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
    @IsOptional()
    finishDate?: Date;

    @IsNumber()
    @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
    ageGroupStart: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
    ageGroupEnd: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
    locationRange: number;

    @IsString()
    @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
    Mtags: string[];

    @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
    peopleGroup: PeopleGroupEnum[];

    @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
    questions: QuestionResearchInput[];
    
    @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
    reward: RewardResearchInput;

    @IsString()
    @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
    brandID: string;
}
