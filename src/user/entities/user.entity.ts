import { PrimaryGeneratedColumn, Column, Entity, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';
import { Roles } from './roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column('citext', {
    nullable: false,
    default: `用户${Math.floor(Math.random() * 10000)}`,
  })
  nickname?: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  account: string;

  @Column()
  password: string;

  @Column('citext', {
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD3TDQBB-_F1sfu-gElz73vtUAdlOdLerHDw&usqp=CAU',
    nullable: true,
  })
  avatar?: string;

  @JoinTable()
  @ManyToMany(type => Roles, role => role.users)
  roles?: string[];
}
