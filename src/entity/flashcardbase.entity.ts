import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Category } from './category.entity';
import { User } from './user.entity';
import { Question } from "./question.entity";

@Entity()
export class Flashcardbase {
  @PrimaryGeneratedColumn()
  id_flashcardbase: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: Date.now().toLocaleString() })
  created_at: string;

  @Column({ default: Date.now().toLocaleString() })
  update_at: string;

  @ManyToOne(() => Category, (category: Category) => category.flashcardbases)
  @JoinColumn()
  category: Category;

  @ManyToOne(() => User, (user: User) => user.flashcardbases)
  @JoinColumn()
  creator: User;

  @OneToMany(() => Question, (question: Question) => question.flashcarbase)
  questions: Question[];
}
