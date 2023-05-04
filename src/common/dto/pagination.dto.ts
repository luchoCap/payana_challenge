import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { CreateInvoiceDto } from 'src/invoices/dto';

export class PaginationDto {
  @ApiPropertyOptional({
    default: 10,
    description: 'Limit number of results',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({
    default: 0,
    description: 'Offset number of results',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  offset?: number = 0;
}

export class PaginatedResponse {
  @ApiProperty({ type: Array<CreateInvoiceDto> })
  data: CreateInvoiceDto[];

  @ApiProperty({
    description: 'Total number of results',
  })
  total: number;

  @ApiProperty({
    description: 'Number of results per page',
  })
  limit: number;

  @ApiProperty({
    description: 'Shift this number of results',
  })
  offset: number;
}
