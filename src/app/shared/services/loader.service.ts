import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);

  readonly loading = toSignal(this.isLoading);

  show = (): void => {
    this.isLoading.next(true);
  };

  hide = (): void => {
    this.isLoading.next(false);
  };
}
