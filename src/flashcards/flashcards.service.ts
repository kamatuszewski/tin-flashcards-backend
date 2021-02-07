import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Category } from '../entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { IJwtSign } from '../auth/interfaces/jwt-sign.interface';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

export abstract class FlashcardsService {
  public abstract findAllCategories(
    options?: IPaginationOptions,
  ): Promise<Pagination<Category> | Category[]>;

  public abstract findAllCategoriesForAdmin(
    options?: IPaginationOptions,
  ): Promise<Pagination<Category> | Category[]>;

  public abstract findAllMyFlashcards(userData: IJwtSign): Promise<any[]>;

  public abstract createCategory(
    payload: CreateCategoryDto,
    jwtData: IJwtSign,
  ): Promise<number>;

  public abstract removeCategory(payload: number): Promise<any>;
  public abstract changeStatusCategory(
    payload: UpdateCategoryDto,
  ): Promise<any>;

  public abstract findAllFlashcards(
    categoryId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<any>>;

  public abstract createFlashcard(
    payload: CreateFlashcardDto,
    jwtData: IJwtSign,
  ): Promise<any>;
}
