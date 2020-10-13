import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class WhenAuthenticatedGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
