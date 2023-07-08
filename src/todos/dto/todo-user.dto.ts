import { IsString, IsNotEmpty } from 'class-validator';

export class TodoUserDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
