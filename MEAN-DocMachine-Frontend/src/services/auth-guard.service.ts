import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, GuardResult, MaybeAsync } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Import your authentication service
import { Role } from '../app/Enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{


  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.authService.isLoggedIn().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          const allowedRoles = route.data['allowedRoles'];
          return this.hasAllowedRole(allowedRoles);
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );

  }

  private hasAllowedRole(allowedRoles: Role[]): boolean {
    if (!allowedRoles || allowedRoles.length === 0) {
      return true; // Allow access if no roles specified
    }
    const userRole = this.authService.getUserRole(); // Get user role from AuthService
    
    // Check for Admin role explicitly (highest access level)
    if (userRole === Role.Admin) {
      return true;
    }
    
    // Check if user role is included in allowed roles (excluding Admin)
    return allowedRoles.some(role => role !== Role.Admin && role === userRole);
  }
}

