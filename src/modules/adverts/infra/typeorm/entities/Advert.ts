import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '@config/upload';
import UserProfile from '@modules/users/infra/typeorm/entities/UserProfile';
import User from '@modules/users/infra/typeorm/entities/User';
import { AdvertType } from '@shared/type_alias/AdvertType';

@Entity('adverts')
class Advert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  user_id: string;

  /*@ManyToOne(() => UserProfile, (userProfile) => userProfile.adverts, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  userProfile: UserProfile;*/

  @ManyToOne(() => User, user => user.id, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  title: string;

  @Column()
  short_description: string;

  @Column()
  full_description: string;

  @Column('varchar')
  type: AdvertType;

  @Column()
  active: boolean;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number;

  @Column()
  @Exclude()
  advert_image: string;

  @Column()
  @Exclude()
  advert_image_in_body: string;

  @Column('int')
  advert_area: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'advert_image_url' })
  getAdvertImageUrl(): string | null {
    if (!this.advert_image) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.advert_image}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucketAdvertImages}.s3.amazonaws.com/${this.advert_image}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'advert_image_in_body_url' })
  getAdvertImageInBodyUrl(): string | null {
    if (!this.advert_image_in_body) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.advert_image_in_body}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucketAdvertImagesInBody}.s3.amazonaws.com/${this.advert_image_in_body}`;
      default:
        return null;
    }
  }
}

export default Advert;
