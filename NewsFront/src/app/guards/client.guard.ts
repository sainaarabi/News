import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
    const tokenPayload: any = decode(token);

    if (!this.auth.isAuthenticated() || expectedRole.indexOf(tokenPayload.role) == -2) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
