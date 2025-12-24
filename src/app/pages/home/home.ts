import { Component } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

import { Lesson } from '../../layout/slides/lesson/lesson';
import { Lesson2 } from '../../layout/slides/lesson-2/lesson-2';
import { Slider } from '../../shared/components/slider/slider';

@Component({
  selector: 'app-home',
  imports: [Slider],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  mySlide = [Lesson, Lesson2];
}
