import {Injectable, NestMiddleware, NotFoundException} from "@nestjs/common";
import {NextFunction} from "express";
import {Request, Response} from 'express';
import {parseJwt} from "../index";

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
  constructor() {
  }

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization !== 'null' && typeof req.headers.authorization === "string") {
      const jwtData = parseJwt(req.headers.authorization)
      if (!jwtData.organization_id) {
        throw new NotFoundException()
      }
      req.body.organization_id = jwtData.organization_id
    }
    if (req.body['createdAt']) {
      delete req.body['createdAt']
    }
    if (req.body['updatedAt']) {
      delete req.body['updatedAt']
    }
    if (req.body['deletedAt']) {
      delete req.body['deletedAt']
    }
    next();
  }
}
