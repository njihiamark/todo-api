import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, User } from '../utils/typeorm';
import { TodoUserDto } from './dto/todo-user.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const user = await this.userRepository.findOne({
      where: { id: createTodoDto.userId },
    });
    if (!user)
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    const newTodo = this.todoRepository.create({ ...createTodoDto, user });
    return this.todoRepository.save(newTodo);
  }

  async findAll(todoUserDto: TodoUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: todoUserDto.id },
    });
    if (!user)
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    const response = await this.userRepository.findOne({
      where: { id: todoUserDto.id },
      select: {
        todos: true,
      },
      relations: {
        todos: true,
      },
    });

    return response.todos;
  }

  async findOne(id: string, todoUserDto: TodoUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: todoUserDto.id },
    });
    if (!user)
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    return await this.todoRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const user = await this.userRepository.findOne({
      where: { id: updateTodoDto.userId },
    });
    if (!user)
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    await this.todoRepository.update({ id }, { ...updateTodoDto });
    return await this.todoRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string, todoUserDto: TodoUserDto) {
    const user = await this.userRepository.findOne({
      where: { id: todoUserDto.id },
    });
    if (!user)
      throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
    return await this.todoRepository.delete({ id });
  }
}
