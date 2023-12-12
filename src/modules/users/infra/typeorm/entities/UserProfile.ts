import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import UserPlan from '@shared/type_alias/UserPlan';
import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';
import Advert from '@modules/adverts/infra/typeorm/entities/Advert';
import User from './User';

@Entity('user_profile')
class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  user_id: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Advert, advert => advert.user_id, { eager: false })
  @JoinColumn({ name: 'user_id' })
  adverts: Advert[];

  @Column()
  name: string;

  @Column()
  @Exclude()
  avatar: string;

  @Column()
  contact_email: string;

  @Column()
  contact_phone_number: string;

  @Column()
  full_address: string;

  @Column('int')
  address_number: number;

  @Column()
  address_complement: string;

  @Column()
  postal_code: string;

  @Column('int')
  adverts_area: number;

  @Column('int')
  max_active_adverts: number;

  @Column('varchar')
  user_plan: UserPlan;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucketProfileAvatar}.s3.amazonaws.com/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default UserProfile;
