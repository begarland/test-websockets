import { AsyncContainerModule } from 'inversify'
import {
  createConnection,
  getConnection,
  ConnectionOptions,
  Repository,
} from 'typeorm'
import TYPES from './types'
import { logger } from '../util/Logger'
import { MemberSchema } from '../domain/Member/MemberSchema'
import { NoteSchema } from '../domain/Note/NoteSchema'

const entities = [MemberSchema, NoteSchema]
const getMemberRepository = () => getConnection().getRepository(MemberSchema)
const getNoteRepository = () => getConnection().getRepository(NoteSchema)

export const dbBinding = new AsyncContainerModule(async (bind) => {
  await getDbConnection()
  bind<Repository<MemberSchema>>(TYPES.MemberRepository)
    .toDynamicValue(getMemberRepository)
    .inRequestScope()
  bind<Repository<NoteSchema>>(TYPES.NoteRepository)
    .toDynamicValue(getNoteRepository)
    .inRequestScope()
})

const getDbConnection = async () => {
  return await createConnection(<ConnectionOptions>{
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgres_db',
    logging: true,
    synchronize: true,
    entities: entities,
  }).catch((err) => logger.error('Cannot connect to database', err))
}
