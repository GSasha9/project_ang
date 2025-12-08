import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class Slider implements AfterViewInit {
  readonly slides = input<any[]>([]);
  currentIndex = 0;

  readonly container = viewChild('container', { read: ViewContainerRef });
  vc: ViewContainerRef | undefined;

  ngAfterViewInit(): void {
    this.vc = this.container();
    this.renderSlide(this.currentIndex);
  }

  renderSlide(index: number): void {
    if (!this.vc) {
      return;
    }
    this.vc.clear();

    this.vc.createComponent(this.slides()[index]);

    this.currentIndex = index;
  }
}
