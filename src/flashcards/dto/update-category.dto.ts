import { IsNumber, IsString } from 'class-validator';
import { EStatusType } from '../status-type.enum';

export class UpdateCategoryDto {
  @IsString()
  readonly status: EStatusType;

  @IsNumber()
  readonly id_category: number;
}
