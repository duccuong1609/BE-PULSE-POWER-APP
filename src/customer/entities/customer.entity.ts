import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  referanceId: string;
  @Column({ nullable: true })
  name: string;
}
