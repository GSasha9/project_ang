import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-lesson-2',
  imports: [Button],
  templateUrl: './lesson-2.html',
  styleUrl: './lesson-2.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lesson2 {}
