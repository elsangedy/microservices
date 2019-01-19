import { Request } from 'express'

import { JwtPayload } from '@microservices/common/dist/contracts'

interface ContextRequest extends Request {
  user?: JwtPayload
}

export interface Context {
  req: ContextRequest
}
