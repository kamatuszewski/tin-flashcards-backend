import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { ormConfig } from './config/orm.config';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppService } from './app.service';

@Module({
  imports: [
    FlashcardsModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => ormConfig,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
