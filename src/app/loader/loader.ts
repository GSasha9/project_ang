import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loader {
  private loadingService = inject(LoaderService);
  loading = this.loadingService.loading;
}
