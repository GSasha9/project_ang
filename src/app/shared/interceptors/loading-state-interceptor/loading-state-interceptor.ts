import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { LoadingService } from '../../services/loading.service';

export const loadingStateInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  const requestUrl = req.url;

  loading.loadingStatutes.set(requestUrl, true);
  return next(req).pipe(finalize(() => loading.showStatus(false, requestUrl)));
};
