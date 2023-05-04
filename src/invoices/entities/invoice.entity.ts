import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'invoices' })
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric', { unique: true })
  order: number;

  @Column('text')
  cuit: string;

  @Column('decimal')
  total: number;

  @Column({ type: 'json', default: [] })
  products: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
