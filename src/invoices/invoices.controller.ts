import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import {
  CreateInvoiceDto,
  UpdateInvoiceDto,
  CreateInvoicesBulkDto,
} from './dto';
import { JwtGuard } from '../common/guard/jwt.guard';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from '../common/response/error.response';
import { PaginatedResponse, PaginationDto } from '../common/dto/pagination.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @ApiOkResponse({ description: ' Invoice was created succesfully' })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: ' There was an Internal Server Error',
  })
  @ApiOperation({
    summary: 'create Invoice',
    description: 'This endpoint create an invoice',
  })
  @UseGuards(JwtGuard)
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Post('bulk')
  @ApiOkResponse({ description: ' Invoices were created succesfully' })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: ' There was an Internal Server Error',
  })
  @ApiOperation({
    summary: 'Create invoices',
    description: 'This endpoint create many invoices',
  })
  @UseGuards(JwtGuard)
  bulk(@Body() createInvoicesDto: CreateInvoicesBulkDto) {
    return this.invoicesService.bulk(createInvoicesDto.invoices);
  }

  @Get()
  @ApiOkResponse({ description: ' Invoices was found succesfully' })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: ' There was an Internal Server Error',
  })
  @ApiOperation({
    summary: 'find All Invoices',
    description: 'This endpoint return invoices',
  })
  @ApiResponse({
    description: 'List of invoices.',
    type: PaginatedResponse,
  })
  @UseGuards(JwtGuard)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.invoicesService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: ' Invoice was found succesfully' })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: ' There was an Internal Server Error',
  })
  @ApiOperation({
    summary: 'Find an Invoice',
    description: 'This endpoint return a invoice',
  })
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: ' Invoice was updated succesfully' })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: ' There was an Internal Server Error',
  })
  @ApiOperation({
    summary: 'registerUser',
    description: 'This endpoint update an invoice',
  })
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: ' Invoice was removed succesfully' })
  @ApiInternalServerErrorResponse({
    type: ErrorResponse,
    description: ' There was an Internal Server Error',
  })
  @ApiOperation({
    summary: 'registerUser',
    description: 'This endpoint remove a invoice',
  })
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(id);
  }
}
