import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Link } from '@shared/components/link/link';

@Component({
  selector: 'app-lesson-2',
  imports: [Link],
  templateUrl: './lesson-2.html',
  styleUrl: './lesson-2.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lesson2 {}
