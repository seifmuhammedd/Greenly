import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('userToken');

    if (token) {
      try {
        const decoded: any = jwtDecode(token);

        if (decoded.roleTypes === 'admin') {
          return true;
        } else {
          router.navigate(['/app/system/home']);
          return false;
        }

      } catch (error) {
        console.error("JWT decode failed", error);
        router.navigate(['/app/system/home']);
        return false;
      }
    } else {
      router.navigate(['/app/system/login']);
      return false;
    }
  }
  return false;
};
