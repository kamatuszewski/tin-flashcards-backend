import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entity/category.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { FlashcardsService } from '../flashcards.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { IJwtSign } from '../../auth/interfaces/jwt-sign.interface';
import { User } from '../../entity/user.entity';
import { Flashcardbase } from '../../entity/flashcardbase.entity';
import { CreateFlashcardDto } from '../dto/create-flashcard.dto';

@Injectable()
export class FlashcardsRepositoryService implements FlashcardsService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Flashcardbase)
    private flashcardRepository: Repository<Flashcardbase>,
  ) {}

  public async findAllCategories(
    options?: IPaginationOptions,
  ): Promise<Pagination<Category> | Category[]> {
    return !!options
      ? paginate<Category>(this.categoryRepository, options)
      : this.categoryRepository.find();
  }

  public async findAllCategoriesWithUsers(
    options: IPaginationOptions,
  ): Promise<Pagination<Category>> {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category');
    queryBuilder.leftJoinAndSelect('category.creator', 'user');
    queryBuilder.select([
      'category.id_category',
      'category.title',
      'category.created_at',
      'category.status',
      'user.id_user',
      'user.login',
    ]);

    return paginate<Category>(queryBuilder, options);
  }

  public async createCategory(
    payload: CreateCategoryDto,
    userData: IJwtSign,
  ): Promise<number> {
    const categoryInDb = await this.categoryRepository.findOne({
      title: payload.title,
    });

    if (!!categoryInDb) {
      throw new HttpException(
        'CATEGORY_ALREADY_EXISTS',
        HttpStatus.BAD_REQUEST,
      );
    }

    const creator = await this.userRepository.findOne({
      login: userData.username,
    });

    const category = new Category();
    category.status = 'false';
    category.created_at = new Date().toISOString();
    category.title = payload.title;
    category.creator = creator;
    const newCategory = await this.categoryRepository.create(category);
    const savedCategory = await this.categoryRepository.save(newCategory);
    return savedCategory.id_category;
  }

  public async findAllFlashcards(
    categoryId: number,
    options: IPaginationOptions,
  ): Promise<Pagination<any>> {
    return await paginate(this.flashcardRepository, options, {
      where: {
        category: await this.categoryRepository.findOne({
          where: { id_category: categoryId },
        }),
      },
    });
  }

  public async createFlashcard(
    payload: CreateFlashcardDto,
    jwtData: IJwtSign,
  ): Promise<any> {
    const isUsed = await FlashcardsRepositoryService.checkAlreadyUsed<Flashcardbase>(
      this.flashcardRepository,
      'FLASHCARD_ALREADY_EXISTS',
      { title: payload.title },
    );

    if (!!isUsed) {
      return;
    }

    const category = await this.categoryRepository.findOne({
      id_category: payload.categoryId,
    });

    const creator = await this.getCreator(jwtData.username);
    const flashCard = new Flashcardbase();
    flashCard.creator = creator;
    flashCard.description = payload.description;
    flashCard.title = payload.title;
    flashCard.category = category;

    const newData = await this.flashcardRepository.create(flashCard);
    const savedData = await this.flashcardRepository.save(newData);
    return savedData.id_flashcardbase;
  }

  private static async checkAlreadyUsed<T>(
    repository: Repository<T>,
    error: string,
    check: { [key: string]: string },
  ): Promise<boolean> {
    const db: T = await repository.findOne(check);
    if (!!db) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    return false;
  }

  private async getCreator(login: string): Promise<User> {
    return await this.userRepository.findOne({ login });
  }

  //
  // public create(newFlashcard: Flashcard): void {
  //   const id = Date.now();
  //   this.flashcards[id] = { ...newFlashcard, id };
  // }
  //
  // public find(id: number): Flashcard {
  //   const flashCard = this.flashcards[id];
  //   if (!flashCard) throw new Error('No flashcards found.');
  //   return flashCard;
  // }
  //
  // public update(payload: Flashcard): void {
  //   if (!this.flashcards[payload.id]) throw new Error('No flashcards found.');
  //   this.flashcards[payload.id] = payload;
  // }
  //
  // public delete(id: number): void {
  //   const flashcard: Flashcard = this.flashcards[id];
  //   if (!flashcard) throw new Error('No flashcards found.');
  //   delete this.flashcards[id];
  // }
}
