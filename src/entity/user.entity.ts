import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Role } from './role.entity';
import { Category } from './category.entity';
import { Flashcardbase } from "./flashcardbase.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id_user: number;

  @Column()
  login: string;

  @Column()
  password?: string;

  @Column()
  email: string;

  @Column({ default: Date.now().toLocaleString() })
  created_at: string;

  @Column({ default: Date.now().toLocaleString() })
  updated_at: string;

  @ManyToOne(() => Role, (role: Role) => role.users)
  @JoinColumn()
  role: Role;

  @OneToMany(() => Category, (category: Category) => category.creator)
  categories: Category[];

  @OneToMany(
    () => Flashcardbase,
    (flashcardbase: Flashcardbase) => flashcardbase.creator,
  )
  flashcardbases: Flashcardbase[];
}
