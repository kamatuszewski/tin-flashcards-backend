import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entity/role.entity';
import { User } from '../entity/user.entity';
import { UsersService } from './users.service';
import { UsersRepositoryService } from './services/user-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [{ provide: UsersService, useClass: UsersRepositoryService }],
  exports: [UsersService],
})
export class UsersModule {}
