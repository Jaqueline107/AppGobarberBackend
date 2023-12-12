import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('favorites_adverts')
class FavoriteAdvert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  advert_id: string;

  /*@ManyToOne(() => User, (user) => user.adverts, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;  */

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FavoriteAdvert;
