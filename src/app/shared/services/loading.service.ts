import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  isLoadingSub = new BehaviorSubject<boolean>(false);

  loadingStatutes = new Map<string, boolean>();

  showStatus = (isLoading: boolean, url: string): void => {
    if (isLoading === true) {
      this.loadingStatutes.set(url, true);
      this.isLoadingSub.next(true);
    } else if (isLoading === false && this.loadingStatutes.has(url)) {
      this.loadingStatutes.delete(url);
    }

    if (this.loadingStatutes.size === 0) {
      this.isLoadingSub.next(false);
    }
  };
}
