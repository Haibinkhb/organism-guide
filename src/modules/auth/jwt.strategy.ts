import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthDocument } from 'src/model/auth.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      secretOrPrivateKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthDocument) {
    return {
      username: payload.username,
    };
  }
}
