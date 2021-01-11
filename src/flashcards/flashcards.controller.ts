import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Flashcard } from './flashcard';
import { Flashcards } from './flashcards';
import { FlashcardsService } from './flashcards.service';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Get()
  public async findAll(): Promise<Flashcards> {
    return this.flashcardsService.findAll();
  }

  @Get(':id')
  public async find(@Param('id') id: number): Promise<Flashcard> {
    return this.flashcardsService.find(id);
  }

  @Post()
  public create(@Body() flashcard: Flashcard): void {
    this.flashcardsService.create(flashcard);
  }

  @Put()
  public update(@Body() flashcard: Flashcard): void {
    this.flashcardsService.update(flashcard);
  }

  @Delete(':id')
  public delete(@Param('id') id: number): void {
    this.flashcardsService.delete(id);
  }
}
