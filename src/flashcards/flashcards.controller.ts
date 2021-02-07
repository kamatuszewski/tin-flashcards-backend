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
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Public()
  @Get()
  public async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Category>> {
    return this.flashcardsService.findAllCategories({ page, limit }) as Promise<
      Pagination<Category>
    >;
  }

  @Public()
  @Get('manage')
  public async findAllCategoryManage(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Pagination<Category>> {
    return this.flashcardsService.findAllCategoriesForAdmin({
      page,
      limit,
    }) as Promise<Pagination<Category>>;
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
    return this.flashcardsService.createFlashcard(payload, req['user']);
  }

  @Delete('remove/:id')
  public removeCategory(@Param('id') id: number): Promise<any> {
    return this.flashcardsService.removeCategory(id);
  }

  @Put('change-status')
  public changeStatusCategory(
    @Body() payload: UpdateCategoryDto,
  ): Promise<any> {
    return this.flashcardsService.changeStatusCategory(payload);
  }
}
