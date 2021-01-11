import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { EUserRole } from '../users/enum/user-role.enum';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryColumn()
  id_role: number;

  @Column()
  name: EUserRole;

  @OneToMany(() => User, (user: User) => user.role)
  users: User[];
}
