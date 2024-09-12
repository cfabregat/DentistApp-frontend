import { CanActivateFn } from '@angular/router';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = !!localStorage.getItem('isAuthenticated'); // Verifica si hay un valor de autenticación en localStorage
  return isAuthenticated; // Permite el acceso si está autenticado
};
