import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo, User } from '../utils/typeorm';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
