import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  description: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
