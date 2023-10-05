import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Joke {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;
}
