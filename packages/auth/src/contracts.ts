import { Request } from 'express'

import { JwtPayload } from '@microservices/common/dist/contracts'

export interface ContextRequest extends Request {
  user?: JwtPayload
}
