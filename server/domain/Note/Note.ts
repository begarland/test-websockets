import { NoteDto } from './NoteSchema'

export class Note {
  constructor(
    public noteId: number,
    public memberId: number,
    public content: string
  ) {}
}

export class NoteMapper {
  public static toNoteDto(note: Note): NoteDto {
    return {
      member_note_id: note.noteId,
      member_id: note.memberId,
      content: note.content,
    }
  }

  public static toNoteDtos(notes: Note[]): NoteDto[] {
    return notes.map(NoteMapper.toNoteDto)
  }

  public static toNote(noteDto: NoteDto): Note {
    return new Note(noteDto.member_note_id, noteDto.member_id, noteDto.content)
  }

  public static toNotes(noteDtos: NoteDto[]): Note[] {
    return noteDtos.map(NoteMapper.toNote)
  }
}
