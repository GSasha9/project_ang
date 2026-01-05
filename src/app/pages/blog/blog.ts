import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DRAFT_BLOG_POSTS } from '@shared/constants/draft-blog-posts';

@Component({
  selector: 'app-blog',
  imports: [],
  templateUrl: './blog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  draftPosts = DRAFT_BLOG_POSTS;
}
