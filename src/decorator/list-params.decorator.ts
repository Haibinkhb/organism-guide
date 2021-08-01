import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

interface ListParamsResult {
  limit: number;
  skip: number;
  order: string;
  
}

export const ListParams = createParamDecorator(
  (customConfig, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    try {
      const { current, pageSize, order, ...filter } = req.query;
      console.log(filter);
      debugger;
      return {
        limit: +pageSize,
        skip: +pageSize * +current,
        order,
        filter,
      };
    } catch (e) {
      console.error(e);
      return {};
    }
  },
);
