import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['expectedRole'];
  const currentUser = authService.currentUserValue;

  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  const userRole = currentUser.isAdminDto ? 'Admin' : 'User';

  if (expectedRole === 'Admin' && userRole !== 'Admin') {
    router.navigate(['/']); // Rediriger vers la page d'accueil si pas admin
    return false;
  }

  // Pour le rôle 'User', un admin est aussi un user, donc on laisse passer
  return true;
};