import { IsBoolean, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  readonly contents: string;

  @IsBoolean()
  readonly is_correct: boolean;
}
