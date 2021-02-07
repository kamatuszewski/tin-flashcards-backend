import { IsArray, IsString } from 'class-validator';
import { CreateAnswerDto } from './create-answer.dto';

export class CreateQuestionsDto {
  @IsString()
  readonly title: string;

  @IsArray()
  readonly answers: CreateAnswerDto[];
}
