import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getHello() {
    return {
      message: 'CVBoost AI Backend is running',
    };
  }
}
