import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Category } from '../entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { IJwtSign } from '../auth/interfaces/jwt-sign.interface';
import { Flashcardbase } from '../entity/flashcardbase.entity';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';

export abstract class FlashcardsService {
  public abstract findAllCategories(
    options?: IPaginationOptions,
  ): Promise<Pagination<Category> | Category[]>;

  public abstract findAllCategoriesWithUsers(
    options: IPaginationOptions,
  ): Promise<Pagination<Category>>;

  public abstract createCategory(
    payload: CreateCategoryDto,
    jwtData: IJwtSign,
  ): Promise<number>;

  public abstract findAllFlashcards(
    categoryId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<any>>;

  public abstract createFlashcard(
    payload: CreateFlashcardDto,
    jwtData: IJwtSign,
  ): Promise<any>;
}
