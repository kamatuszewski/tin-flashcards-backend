import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flashcardbase } from './flashcardbase.entity';
import { Questiontype } from './questiontype.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id_question: number;

  @Column()
  contents: string;

  @Column({ default: Date.now().toLocaleString() })
  created_at: string;

  @Column({ default: Date.now().toLocaleString() })
  update_at: string;

  @ManyToOne(
    () => Flashcardbase,
    (flashcarbase: Flashcardbase) => flashcarbase.questions,
  )
  @JoinColumn()
  flashcarbase: Flashcardbase;

  @ManyToOne(
    () => Questiontype,
    (questionType: Questiontype) => questionType.questions,
  )
  @JoinColumn()
  questiontype: Questiontype;

  @OneToMany(() => Answer, (answer: Answer) => answer.question)
  answers: Answer[];
}
