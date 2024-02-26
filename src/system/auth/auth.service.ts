import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

interface User {
    index: number;
    id: string;
    name: string;
}


@Injectable()
export class AuthService { 
  constructor(
    // @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    ) { }

  // JWT 환경변수 설정
  JwtIssuer: string = process.env.JWT_ISSUER;
  AccessSecret: string = process.env.JWT_ACCESS_SECRET;
  AccessExpiresin: string = process.env.JWT_ACCESS_EXPIRESIN;
  RefreshSecret: string = process.env.JWT_REFRESH_SECRET;
  RefreshExpiresin: string = process.env.JWT_REFRESH_EXPIRESIN;
    
  login(user: User) {
      const payload = { ...user };
      const accessSecret = process.env.JWT_ACCESS_SECRET;
      const accessTokenTime = process.env.JWT_ACCESS_EXPIRESIN;

      return this.createToken(payload, accessSecret, accessTokenTime);

  }

  loginCreateAccessToken(user: User) {
    const payload = { ...user };
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const accessTokenTime = process.env.JWT_ACCESS_EXPIRESIN;

    return this.createToken(payload, accessSecret, accessTokenTime);
  }

  loginCreateRefreshToken(user: User) {
    console.log(this.RefreshSecret);
    const payload = { ...user };
    // const refreshSecret = process.env.JWT_REFRESH_SECRET;
    // const refreshTokenTime = process.env.JWT_REFRESH_EXPIRESIN;

    // return this.createToken(payload, refreshSecret, refreshTokenTime);
    return this.createToken(payload, this.RefreshSecret, this.RefreshExpiresin);
  }

  createToken(payload: any, secretKey: string, tokenTime: string) {
    return jwt.sign(
        {
          index: payload.index,
          id: payload.id,
          name: payload.name
        },
        secretKey,
        {
          algorithm: 'HS512',
          expiresIn: tokenTime,
          issuer: process.env.JWT_ISSUER
        }      
      );
  }

  verify(jwtString: string) {
    try {
      const payload = jwt.verify(jwtString, process.env.JWT_ACCESS_SECRET) as (jwt.JwtPayload | string) & User;

      const { index, id } = payload;

      return {
        auth: 'success',
        index,
        id,
      }
    } catch (e) {
      return {
        auth: 'false'
      }
      // throw new UnauthorizedException('승인에 실패하였습니다.')
    }
  }

  refreshVerify(jwtString: string) {
    try {
      const payload = jwt.verify(jwtString, process.env.JWT_REFRESH_SECRET) as (jwt.JwtPayload | string) & User;
  
      const { index, id } = payload;
  
      return {
        auth: 'success',
        index,
        id,
      }
    } catch (e) {
      return {
        auth: 'false'
      }
      // throw new UnauthorizedException('Refresh Token 승인에 실패하였습니다.')
    }
  }

}
