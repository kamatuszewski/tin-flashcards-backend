import { IsNumber, IsOptional, IsString } from 'class-validator';

export class Flashcard {
  @IsNumber()
  @IsOptional()
  readonly id: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly cover: string;
}
