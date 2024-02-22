import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from '../database';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles.length === 0) {
      return false; // No roles are defined; allow access.
    }
    const request = context.switchToHttp().getRequest();
    const authorization = request.header('authorization');
    if (!authorization) {
      return false;
    }
    if (authorization.split(' ')[0] !== 'Bearer') {
      return false;
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      return false;
    }
    try {
      const decoded: any = jwt.verify(token, '1333@#$%123$%^&*dajcskdn89?)()#$@&haSS', { ignoreExpiration: true });
      const userId = decoded.id;
      const user = await UserRepository.findOne({ where: { userId, isActive: 1 }});
      console.log('user', user);
      if (!user) {
        return false;
      }
      request.user = user;
      return true;
    } catch (error) {
      console.log('error', error)
      return false;
    }
  }
}
