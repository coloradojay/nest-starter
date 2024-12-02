import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    nullable: true,
    name: 'first_name',
  })
  firstName?: string;

  @Column({
    nullable: true,
    name: 'last_name',
  })
  lastName?: string;
}
