import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { HIDE } from '../../util/DecoratorHelper'
import { MemberSchema, MemberDto } from '../Member/MemberSchema'

export interface NoteDto {
  member_note_id: number
  member_id: number
  content: string
  created_timestamp?: Date
  updated_timestamp?: Date

  member?: MemberDto
}

/**
 * TypeORM Schema Config
 */
@Entity('member_note')
export class NoteSchema implements NoteDto {
  @PrimaryGeneratedColumn()
  public member_note_id: number
  @Column()
  public member_id: number
  @Column()
  public content: string
  @CreateDateColumn(HIDE)
  public created_timestamp: Date
  @UpdateDateColumn(HIDE)
  public updated_timestamp: Date

  @ManyToOne((type) => MemberSchema, (member) => member.notes)
  @JoinColumn({ name: 'member_id' })
  public member: MemberSchema
}
