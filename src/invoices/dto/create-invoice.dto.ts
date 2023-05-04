import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty()
  @IsNumber()
  order: number;

  @ApiProperty()
  @IsString()
  cuit: string;

  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty()
  @IsString()
  products: string;
}
