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
import { EStatusType } from '../flashcards/status-type.enum';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id_category: number;

  @Column()
  title: string;

  @Column({ default: Date.now().toLocaleString() })
  created_at: string;

  @Column()
  status: EStatusType;

  @ManyToOne(() => User, (user: User) => user.categories)
  @JoinColumn()
  creator: User;

  @OneToMany(
    () => Flashcardbase,
    (flashcardbase: Flashcardbase) => flashcardbase.category,
    { onDelete: 'CASCADE' },
  )
  flashcardbases: Flashcardbase[];
}
