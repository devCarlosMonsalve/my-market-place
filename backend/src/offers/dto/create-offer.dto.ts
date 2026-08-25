import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsInt()
  storeId: number;
}
