import { Module } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { FlashcardsController } from './flashcards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entity/category.entity';
import { FlashcardsRepositoryService } from './services/flashcards-repository.service';
import { User } from '../entity/user.entity';
import { Flashcardbase } from '../entity/flashcardbase.entity';
import { Question } from '../entity/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, User, Flashcardbase, Question]),
  ],
  providers: [
    {
      provide: FlashcardsService,
      useClass: FlashcardsRepositoryService,
    },
  ],
  controllers: [FlashcardsController],
})
export class FlashcardsModule {}
