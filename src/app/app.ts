import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Slider } from './shared/components/slider/slider';
import { Lesson } from './layout/slides/lesson/lesson';
import { Lesson2 } from './layout/slides/lesson-2/lesson-2';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Slider],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('temp');
  mySlide = [Lesson, Lesson2];
}
