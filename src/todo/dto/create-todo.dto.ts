import {
  IsString,
  Length,
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @Length(1, 50)
  readonly creator: string;

  @IsDateString()
  readonly creatTime: string;

  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly brief?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsArray()
  readonly contributors?: string[];

  @IsOptional()
  @IsArray()
  readonly planlimit?: string[];

  @IsBoolean()
  readonly completed: boolean;
}
