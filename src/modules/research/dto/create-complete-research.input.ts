import { InputType, } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateQuestionInput } from 'src/modules/question/dto/create-question.input';

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
    question: CreateQuestionInput[];
    
    @IsString()
    @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
    brandID: string;
}
