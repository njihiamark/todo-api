import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoUserDto } from './dto/todo-user.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll(@Body() todoUserDto: TodoUserDto) {
    return this.todosService.findAll(todoUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body() todoUserDto: TodoUserDto) {
    return this.todosService.findOne(id, todoUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() todoUserDto: TodoUserDto) {
    return this.todosService.remove(id, todoUserDto);
  }
}
