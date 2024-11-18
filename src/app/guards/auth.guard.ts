import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'

export const authGuardGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService)
  if (await authService.isAuthenticated()) return true

  const router = inject(Router)
  router.navigate(['/login'])

  return false
}