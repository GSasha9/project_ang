import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BlogPostData } from '@shared/models/blog-post-data.model';

@Component({
  selector: 'app-blog-post',
  imports: [],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPost {
  readonly postData = input<BlogPostData>();
}
