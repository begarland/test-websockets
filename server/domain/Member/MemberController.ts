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
import { MemberService } from './MemberService'
// tslint:disable:no-unused-variable

@controller('/member')
export class MemberController implements interfaces.Controller {
  @inject(TYPES.MemberService)
  private memberService: MemberService

  @httpPost('/')
  private async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    return await this.memberService.createMember(req.body)
  }
  @httpGet('/:id')
  private async get(
    @requestParam('id') id: string,
    res: express.Response,
    next: express.NextFunction
  ) {
    return await this.memberService.getMember(id).catch((err) => next(err))
  }
  @httpGet('/search/:query')
  private async search(
    @requestParam('query') query: string,
    res: express.Response,
    next: express.NextFunction
  ) {
    return await this.memberService.searchMembers(query)
  }
}
