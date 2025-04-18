import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MaxLength(22)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string;

}
