import { HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';

import { appCache, cacheInterceptor } from './cache-interceptor';

describe('cacheInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => cacheInterceptor(req, next));

  beforeEach(() => {
    appCache.clear();
    TestBed.configureTestingModule({});
  });

  it('should cash response on first request', async () => {
    const request = new HttpRequest('GET', '/books?page=1');
    const response = new HttpResponse({ body: { data: 'books' } });

    const next = vi.fn().mockReturnValue(of(response));

    const result$ = interceptor(request, next);

    const result = await firstValueFrom(result$);

    expect(next).toHaveBeenCalledTimes(1);

    expect(result).toEqual(response);
  });

  it('should return cashed response without calling next', async () => {
    const request = new HttpRequest('GET', '/books?page=1');
    const response = new HttpResponse({ body: { data: 'books' } });
    const next = vi.fn().mockReturnValue(of(response));

    const results$ = interceptor(request, next);
    await firstValueFrom(results$);

    const cashed$ = interceptor(request, next);
    const cashed = await firstValueFrom(cashed$);

    if (cashed instanceof HttpResponse) {
      expect(cashed.body).toEqual({ data: 'books' });
    } else {
      throw new Error('test failed');
    }

    expect(next).toHaveBeenCalledTimes(1);
  });
});
