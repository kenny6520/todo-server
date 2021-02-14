import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from 'typeorm';
import { User } from '../entities/user.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany((type) => User, (role) => role.roles)
  users: string[];
}
