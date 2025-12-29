import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class Slider implements AfterViewInit {
  private destroyRef = inject(DestroyRef);
  readonly slides = input<any[]>([]);
  readonly currentIndex = signal(0);
  readonly container = viewChild('container', { read: ViewContainerRef });
  vc: ViewContainerRef | undefined;

  ngAfterViewInit(): void {
    this.vc = this.container();

    this.renderSlide(0);

    const id = setInterval(this.autoRenderSlide, 5000);

    this.destroyRef.onDestroy(() => clearInterval(id));
  }

  renderSlide = (index: number): void => {
    if (!this.vc) {
      return;
    }
    this.vc.clear();

    this.vc.createComponent(this.slides()[index]);
    this.currentIndex.set(index);
  };

  autoRenderSlide = (): void => {
    const maxCount = this.slides().length;

    const nextIndex = this.currentIndex() + 1 >= maxCount ? 0 : this.currentIndex() + 1;

    this.renderSlide(nextIndex);

    this.currentIndex.set(nextIndex);
  };
}
