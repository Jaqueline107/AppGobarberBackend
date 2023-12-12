import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Advert from '@modules/adverts/infra/typeorm/entities/Advert';
import UserProfile from './UserProfile';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @OneToOne(() => UserProfile, { eager: false })
  @JoinColumn({ name: 'id' })
  userProfile: UserProfile;

  @OneToMany(() => Advert, advert => advert.user, { eager: false })
  @JoinColumn({ name: 'user_id' })
  adverts: Advert[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
