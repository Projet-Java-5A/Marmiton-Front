import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Définition des rôles attendus
type Role = 'User' | 'Admin';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.currentUserValue;

  // Récupérer le rôle attendu depuis les données de la route
  const expectedRole = route.data['expectedRole'] as Role;

  // Si l'utilisateur n'est pas connecté, le rediriger vers la page de connexion
  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  // Vérifier le rôle
  if (expectedRole === 'Admin' && !currentUser.isAdminDto) {
    // Si un admin est requis mais que l'utilisateur n'est pas admin
    router.navigate(['/']); // Rediriger vers l'accueil ou une page "non autorisé"
    return false;
  }
  
  // Si le rôle est 'User', il suffit d'être connecté (admin ou non)
  // Si le rôle est 'Admin' et l'utilisateur est admin, la condition passe
  return true;
};