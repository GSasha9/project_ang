import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { cacheInterceptor } from './shared/interceptors/cache-interceptor/cache-interceptor';
import { errorHandlingInterceptor } from './shared/interceptors/error-handling-interceptor/error-handling-interceptor';
import { loadingInterceptor } from './shared/interceptors/loading-interceptor/loading-interceptor';
import { userLoginReducer } from './state/users/users-login.reducer';
import { usersRegisterReducer } from './state/users/users-register.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([cacheInterceptor, errorHandlingInterceptor, loadingInterceptor]),
    ),
    provideStore({
      usersRegister: usersRegisterReducer,
      usersLogIn: userLoginReducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: undefined,
    }),
  ],
};
