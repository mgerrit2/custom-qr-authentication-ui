import { HttpInterceptorFn } from '@angular/common/http';
import {AuthService} from '../../services/AuthService';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  try {

    const authService = inject(AuthService);


    // Optional: Skip adding token for external/public APIs
    if (req.url.includes('api.public-service.com')) {
      return next(req);
    }

    const authToken = authService.accessToken(); // Read directly from the signal

    // Temporary debug log for production troubleshooting
    console.log('Intercepting URL:', req.url);
    console.log('Token found:', !!authToken);

    if (authToken) {
      // Clone the request and add the Authorization header
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next(authReq);
    }

    console.warn('Request sent WITHOUT authorization header!', req.url);
    // Pass through original request if no token exists
    return next(req);

  } catch (err) {
    console.error('Auth interceptor error in production:', err);
    return next(req);
  }
};
