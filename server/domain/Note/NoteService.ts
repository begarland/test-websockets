import { injectable, inject } from 'inversify'
import TYPES from '../../container/types'
import { Note, NoteMapper } from './Note'
import { NoteDao } from './NoteDao'

export interface NoteService {
  createNote(Note: Note): Promise<Note>
}

@injectable()
export class NoteServiceImpl implements NoteService {
  @inject(TYPES.NoteDao)
  private noteDao: NoteDao

  public async createNote(note: Note): Promise<Note> {
    const newNoteDto = await this.noteDao.create(NoteMapper.toNoteDto(note))
    const newNote = NoteMapper.toNote(newNoteDto)
    return newNote
  }
}
