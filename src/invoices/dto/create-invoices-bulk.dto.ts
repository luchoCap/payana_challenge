import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { CreateInvoiceDto } from './create-invoice.dto';
import { Type } from 'class-transformer';

export class CreateInvoicesBulkDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateInvoiceDto)
  invoices: CreateInvoiceDto[];
}
