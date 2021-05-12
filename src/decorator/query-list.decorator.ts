import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const QueryList = createParamDecorator(
  (name = 'query', ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    try {
      debugger;
      return req.query || {};
    } catch (e) {
      console.error(e);
      return {};
    }
  },
);
