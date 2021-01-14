import { Module } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { FlashcardsController } from './flashcards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entity/category.entity';
import { FlashcardsRepositoryService } from './services/flashcards-repository.service';
import { User } from '../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, User])],
  providers: [
    {
      provide: FlashcardsService,
      useClass: FlashcardsRepositoryService,
    },
  ],
  controllers: [FlashcardsController],
})
export class FlashcardsModule {}
