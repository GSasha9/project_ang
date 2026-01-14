import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Link } from '@shared/components/link/link';

@Component({
  selector: 'app-lesson',
  imports: [Link],
  templateUrl: './lesson.html',
  styleUrl: './lesson.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lesson {}
