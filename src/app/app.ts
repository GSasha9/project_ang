import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Header } from './layout/header/header';
import { Slider } from './shared/components/slider/slider';
import { Lesson } from './layout/slides/lesson/lesson';
import { Lesson2 } from './layout/slides/lesson-2/lesson-2';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, Slider, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('temp');
  mySlide = [Lesson, Lesson2];
}
