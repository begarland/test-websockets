import * as express from 'express'
import {
  controller,
  httpGet,
  requestParam,
  interfaces,
  httpPost,
} from 'inversify-express-utils'
import { inject } from 'inversify'
import TYPES from '../../container/types'
import { NoteService } from './NoteService'
// tslint:disable:no-unused-variable

@controller('/note')
export class NoteController implements interfaces.Controller {
  @inject(TYPES.NoteService)
  private noteService: NoteService

  @httpPost('/')
  private async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    return await this.noteService.createNote(req.body)
  }
}
