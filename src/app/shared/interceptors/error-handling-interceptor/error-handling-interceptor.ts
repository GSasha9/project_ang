import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { NotificationService } from '../../services/notification.service';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error(error.status, error.message);

      notificationService.show(error.message, 'alert-danger');

      return throwError(() => error);
    }),
  );
};
