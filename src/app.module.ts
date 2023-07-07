import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './utils/typeorm';

@Module({
  imports: [
    UsersModule,
    TodosModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'todos',
      synchronize: true,
      entities,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
