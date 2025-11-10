import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

type Role = 'User' | 'Admin';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.currentUserValue;

  const expectedRole = route.data['expectedRole'] as Role;

  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  if (expectedRole === 'Admin' && !currentUser.isAdminDto) {
    router.navigate(['/']); 
    return false;
  }
  
  return true;
};