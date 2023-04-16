import { Injectable } from '@nestjs/common'

import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
  ) {
  }

  login(userDto: any) {
    return 'Login'
  }

  registration(userDto: any) {
    return 'Registration'
  }
}
