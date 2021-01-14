import { ShortUserDataDto } from '../users/dto/short-user-data.dto';

export class CategoriesWithUserDto {
  public id: number;
  public author: ShortUserDataDto;
  public title: string;
  public createdDate: string;
  public status: string;

  constructor(
    id: number,
    author: ShortUserDataDto,
    title: string,
    createdDate: string,
    status: string,
  ) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.createdDate = createdDate;
    this.status = status;
  }
}
