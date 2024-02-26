import { Request } from 'express';
import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './system/auth/auth.service';

@Injectable()
export class AuthRefreshGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwtString = request.headers.authorization.split('Bearer ')[1];
    
    const  resUser = await this.authService.refreshVerify(jwtString) ;

    if(resUser.auth == 'success'){
      request.authUser = resUser;    
      
      return true;
    } else {
      throw new UnauthorizedException('Refresh Token 승인에 실패하였습니다.')
    }
  }

  // canActivate(
  //   context: ExecutionContext,
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   const request = context.switchToHttp().getRequest();
  //   return this.validateRequest(request);
  // }

  // private validateRequest(request: Request) {
  //   const jwtString = request.headers.authorization.split('Bearer ')[1];

  //   this.authService.refreshVerify(jwtString);

  //   return true;
  // }
}