import { Repository } from 'typeorm'
import { injectable, inject } from 'inversify'
import TYPES from '../../container/types'
import { NoteDto, NoteSchema } from './NoteSchema'

export interface NoteDao {
  create(Note: NoteDto): Promise<NoteDto>
}

@injectable()
export class NoteDaoImpl implements NoteDao {
  @inject(TYPES.NoteRepository)
  private readonly noteRepository: Repository<NoteSchema>

  public async create(note: NoteDto): Promise<NoteDto> {
    return await this.noteRepository.save(note)
  }
}
