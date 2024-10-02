import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  if (authService.isAuthenticated()) return true

  const router = inject(Router)
  router.navigate(['/login'])

  return false
}