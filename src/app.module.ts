import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';

@Module({
  imports: [FlashcardsModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
