import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Button } from '../../../shared/components/button/button';

@Component({
  selector: 'app-lesson',
  imports: [Button],
  templateUrl: './lesson.html',
  styleUrl: './lesson.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lesson {}
