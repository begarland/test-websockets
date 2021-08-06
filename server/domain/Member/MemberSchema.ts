import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm'
import { HIDE } from '../../util/DecoratorHelper'
import { NoteSchema, NoteDto } from '../Note/NoteSchema'

export interface MemberDto {
  member_id: number
  first_name: string
  last_name: string
  email: string
  created_timestamp?: Date
  updated_timestamp?: Date

  notes: NoteDto[]
}

/**
 * TypeORM Schema Config
 */
@Entity('member')
export class MemberSchema implements MemberDto {
  @PrimaryGeneratedColumn()
  public member_id: number
  @Column()
  public first_name: string
  @Column()
  public last_name: string
  @Column()
  public email: string
  @CreateDateColumn(HIDE)
  public created_timestamp: Date
  @UpdateDateColumn(HIDE)
  public updated_timestamp: Date

  @OneToMany((type) => NoteSchema, (note) => note.member)
  @JoinColumn({ name: 'member_id' })
  public notes: NoteSchema[]
}
