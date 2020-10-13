import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean { // TODO -> Dummy for now
    return true;
  }
}
