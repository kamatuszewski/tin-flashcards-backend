import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Category } from '../entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { IJwtSign } from '../auth/interfaces/jwt-sign.interface';

export abstract class FlashcardsService {
  public abstract findAllCategories(
    options: IPaginationOptions,
  ): Promise<Pagination<Category>>;

  public abstract findAllCategoriesWithUsers(
    options: IPaginationOptions,
  ): Promise<Pagination<Category>>;

  public abstract createCategory(
    payload: CreateCategoryDto,
    jwtData: IJwtSign,
  ): Promise<number>;
}
