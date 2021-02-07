import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFlashcardDto {
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  readonly categoryId: number;

  readonly description?: string;
}
