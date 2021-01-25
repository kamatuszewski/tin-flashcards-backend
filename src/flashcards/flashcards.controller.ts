import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { Category } from '../entity/category.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Public } from '../global/meta-data.global';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Flashcardbase } from '../entity/flashcardbase.entity';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';

@Controller('api/flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Public()
  @Get()
  public async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Category>> {
    return this.flashcardsService.findAllCategoriesWithUsers({ page, limit });
  }

  @Public()
  @Get('/question-form-data')
  public async getDataForCreateFlashcard(): Promise<Category[]> {
    return this.flashcardsService.findAllCategories() as Promise<Category[]>;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async createCategory(
    @Body() payload: CreateCategoryDto,
    @Request() req: Request,
  ): Promise<number> {
    return this.flashcardsService.createCategory(payload, req['user']);
  }

  @Public()
  @Get(':id')
  public findAllFlashcards(
    @Param('id') id: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Flashcardbase>> {
    return this.flashcardsService.findAllFlashcards(id, { page, limit });
  }

  @UseGuards(JwtAuthGuard)
  @Post('add-question')
  public createFlashcard(
    @Body() payload: CreateFlashcardDto,
    @Request() req: Request,
  ): Promise<any> {
    return this.flashcardsService.createFlashcard(
      payload,
      req['user']
    );
  }

  // @Get(':id')
  // public async find(@Param('id') id: number): Promise<Flashcard> {
  //   return this.flashcardsService.find(id);
  // }
  //
  // @Post()
  // public create(@Body() flashcard: Flashcard): void {
  //   this.flashcardsService.create(flashcard);
  // }
  //
  // @Put()
  // public update(@Body() flashcard: Flashcard): void {
  //   this.flashcardsService.update(flashcard);
  // }
  //
  // @Delete(':id')
  // public delete(@Param('id') id: number): void {
  //   this.flashcardsService.delete(id);
  // }
}
