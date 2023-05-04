import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  username: string;

  @Column('text', { select: false })
  password: string;

  // TODO: Validamos que sea real (?
  @Column('text', { unique: true })
  email: string;

  @Column('text')
  name: string;

  @Column('text')
  lastName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  beforeInsert() {
    this.email = this.email.toLowerCase();
    console.log('Before insert', this.password);

    this.password = bcrypt.hashSync(this.password, 10);
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.email = this.email.toLowerCase();
    console.log('Before update', this.password);
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }
}
