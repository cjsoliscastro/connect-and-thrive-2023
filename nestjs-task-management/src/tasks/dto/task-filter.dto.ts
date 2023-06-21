import { IsOptional, IsString } from 'class-validator';

export class TaskFilterDto {
  @IsOptional()
  @IsString()
  title: string = null;

  @IsOptional()
  @IsString()
  description: string = null;
}
