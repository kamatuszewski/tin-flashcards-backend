import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Questiontype {
  @PrimaryGeneratedColumn()
  id_questiontype: number;

  @Column()
  type: string;

  @OneToMany(() => Question, (question: Question) => question.questiontype)
  questions: Question[];
}
