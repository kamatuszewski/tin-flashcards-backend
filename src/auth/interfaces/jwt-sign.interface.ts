import { EUserRole } from '../../users/enum/user-role.enum';
import { Role } from '../../entity/role.entity';

export interface IJwtSign {
  username: string;
  sub: number;
  role: EUserRole;
}
