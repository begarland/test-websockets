import { Container } from 'inversify'
import { dbBinding } from './dbBinding'
import TYPES from './types'

import '../domain/Member/MemberController'
import {
  MemberService,
  MemberServiceImpl,
} from '../domain/Member/MemberService'
import { MemberDao, MemberDaoImpl } from '../domain/Member/MemberDao'

import '../domain/Note/NoteController'
import { NoteService, NoteServiceImpl } from '../domain/Note/NoteService'
import { NoteDao, NoteDaoImpl } from '../domain/Note/NoteDao'

export const getContainer = async () => {
  const container = new Container()
  await container.loadAsync(dbBinding)
  container.bind<MemberService>(TYPES.MemberService).to(MemberServiceImpl)
  container.bind<MemberDao>(TYPES.MemberDao).to(MemberDaoImpl)
  container.bind<NoteService>(TYPES.NoteService).to(NoteServiceImpl)
  container.bind<NoteDao>(TYPES.NoteDao).to(NoteDaoImpl)

  return container
}
