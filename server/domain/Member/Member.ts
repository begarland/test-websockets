import { MemberDto } from './MemberSchema'
import { NoteDto } from '../Note/NoteSchema'
import { NoteMapper, Note } from '../Note/Note'

export class Member {
  constructor(
    public memberId: number,
    public firstName: string,
    public lastName: string,
    public email: string,

    public notes: Note[]
  ) {}
}

export class MemberMapper {
  public static toMemberDto(member: Member): MemberDto {
    return {
      member_id: member.memberId,
      first_name: member.firstName,
      last_name: member.lastName,
      email: member.email,

      notes: member.notes && NoteMapper.toNoteDtos(member.notes),
    }
  }

  public static toMember(memberDto: MemberDto): Member {
    return new Member(
      memberDto.member_id,
      memberDto.first_name,
      memberDto.last_name,
      memberDto.email,

      memberDto.notes && NoteMapper.toNotes(memberDto.notes)
    )
  }

  public static toMembers(memberDtos: MemberDto[]): Member[] {
    return memberDtos.map(MemberMapper.toMember)
  }
}
