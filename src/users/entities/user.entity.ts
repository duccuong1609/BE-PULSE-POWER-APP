import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Auth } from '../../auth/entities/auth.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ default: 'user' })
  @ApiProperty({ example: 'user', description: 'Role of the user' })
  role: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => Auth, (auth) => auth.user)
  auth: Auth[];
}
