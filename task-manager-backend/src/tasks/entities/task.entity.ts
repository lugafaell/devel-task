import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('task')
export class Task {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  cost: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  date: string;

}
