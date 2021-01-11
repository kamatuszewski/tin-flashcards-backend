import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id_answer: number;

  @Column()
  contents: string;

  @Column()
  is_correct: boolean;

  @ManyToOne(() => Question, (question: Question) => question.answers)
  @JoinColumn()
  question: Question;
}
