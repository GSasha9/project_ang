import { HttpInterceptorFn } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

export const appCache = new Map<string, unknown>();

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheKey = req.urlWithParams;

  if (appCache.has(cacheKey)) {
    return of(new HttpResponse({ body: appCache.get(cacheKey) }));
  } else {
    return next(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          appCache.set(cacheKey, event.body);
        }
      }),
    );
  }
};
