import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({default: Date.now().toLocaleString()})
  created_at: string;

  @Column({default: Date.now().toLocaleString()})
  updated_at: string;
}
