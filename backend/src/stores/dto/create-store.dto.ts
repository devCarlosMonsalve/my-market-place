import { IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
