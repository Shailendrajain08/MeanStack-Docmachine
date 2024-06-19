import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const roles = route.data['roles'] as Array<string>;
  if (authService.isAuthenticated() && roles.some(role => authService.hasRole(role))) {
    return true;
  }

  router.navigate(['']);
  return false;
};