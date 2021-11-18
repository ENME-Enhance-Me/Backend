import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PeopleGroupEnum } from 'src/modules/user/entities/people-group.entity';

@InputType()
export class CreateResearchInput {
  
  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  description: string;

  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  peopleGroup: PeopleGroupEnum[];

  @IsDate()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  startDate: Date;

  @IsDate()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  @IsOptional()
  finishDate?: Date;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  brandID: string;
}
