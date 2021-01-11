import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Flashcardbase } from './flashcardbase.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id_category: number;

  @Column()
  title: string;

  @Column({ default: Date.now().toLocaleString() })
  created_at: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user: User) => user.categories)
  @JoinColumn()
  creator: User;

  @OneToMany(
    () => Flashcardbase,
    (flashcardbase: Flashcardbase) => flashcardbase.category,
  )
  flashcardbases: Flashcardbase[];
}
