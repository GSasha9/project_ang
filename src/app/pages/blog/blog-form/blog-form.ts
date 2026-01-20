import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatFormField, MatSelectModule } from '@angular/material/select';
import { Button } from '@shared/components/button/button';
import { TEMPLATE_POST_IMAGES } from '@shared/constants/template_post_images';
import { BlogPostData } from '@shared/models/blog-post-data.model';

@Component({
  selector: 'app-blog-form',
  imports: [FormsModule, Button, MatSelectModule, MatFormField],
  templateUrl: './blog-form.html',
  styleUrl: './blog-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogForm {
  readonly onSubmitForm = input<(data: BlogPostData) => void>();
  readonly author = input<{ name: string | undefined; pic: string | undefined }>({
    name: '',
    pic: '',
  });

  postImages = TEMPLATE_POST_IMAGES;

  model: BlogPostData = {
    id: 0,

    postDate: '2026-01-01T00:00:00.000Z',
    postTime: '11:30:00',
    title: '',
    text: '',
    img: '',
    author: {
      name: '',
      pic: '',
    },
  };

  submitted = false;

  onSubmit = (form: NgForm): void => {
    const date = new Date();

    this.model.id = Date.now();

    this.model.postDate = date.toISOString().split('T')[0];

    this.model.postTime = date.toLocaleTimeString();

    this.model.author.name = this.author().name || 'Unknown Author';

    this.model.author.pic = this.author().pic || '/project_ang/user.png';

    this.onSubmitForm()?.({ ...this.model });

    form.resetForm({
      title: '',
      text: '',
      img: '',
    });
  };
}
