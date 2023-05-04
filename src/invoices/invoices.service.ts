import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto';
import { Invoice } from './entities/invoice.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    const newInvoice = this.invoiceRepository.create(createInvoiceDto);
    await this.invoiceRepository.save(newInvoice);
    return newInvoice;
  }

  async bulk(createInvoicesDto: CreateInvoiceDto[]) {
    const invoiceEntities = this.invoiceRepository.create(createInvoicesDto);
    await this.invoiceRepository.insert(invoiceEntities);
    return invoiceEntities;
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const [invoices, total] = await this.invoiceRepository.findAndCount({
      take: limit,
      skip: offset,
    });
    return {
      data: invoices,
      total,
      limit,
      offset,
    };
  }

  async findOne(id: string) {
    const invoice = await this.invoiceRepository.findOneBy({ id });
    if (!invoice) {
      throw new NotFoundException(`Invoice with id ${id} not found`);
    }

    return invoice;
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const oldInvoice = await this.findOne(id);
    const updatedCity = this.invoiceRepository.create({
      ...oldInvoice,
      ...updateInvoiceDto,
    });
    await this.invoiceRepository.update(id, updateInvoiceDto);
    return updatedCity;
  }

  async remove(id: string) {
    const oldInvoice = await this.findOne(id);
    await this.invoiceRepository.remove(oldInvoice);

    return { ok: true, message: `Invoice with id ${id} removed successfully` };
  }
}
