import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  referanceId: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  description?: string;
  @Column({ nullable: true })
  imgUrl?: string;
  @Column({ nullable: true })
  price?: number;
}
