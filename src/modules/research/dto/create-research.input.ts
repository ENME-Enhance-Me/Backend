import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PeopleGenreEnum } from 'src/modules/user/entities/people-genre.entity';
import { PeopleGroupEnum } from './peoplegroup.input';

@InputType()
export class CreateResearchInput {

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  name: string;

  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  peopleGenre: PeopleGenreEnum[];

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

  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  peopleGroup: PeopleGroupEnum;

  @IsBoolean()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  forLead: boolean;

  @IsBoolean()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  forClient: boolean;

  @IsString()
  @IsNotEmpty({ message: 'Campo nome não pode estar vazio' })
  brandID: string;
}
