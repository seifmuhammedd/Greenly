import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const reqHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const _PLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(_PLATFORM_ID)) {
    if(req.url.includes("cart") || req.url.includes("wishList") || req.url.includes("orders") || req.url.includes("/blog") || req.url.includes("license/requestLicense") || req.url.includes("user")){

      if (localStorage.getItem('userToken') != null) {
          req = req.clone({
          setHeaders: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        });
      }

    }

  }

  return next(req);
};
