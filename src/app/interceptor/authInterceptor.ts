import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Optional: Skip adding token for external/public APIs
  if (req.url.includes('api.public-service.com')) {
    return next(req);
  }

  // Retrieve token from localStorage or your AuthService
  const authToken = localStorage.getItem('access_token');

  if (authToken) {
    // Clone the request and add the Authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq);
  }

  // Pass through original request if no token exists
  return next(req);
};
