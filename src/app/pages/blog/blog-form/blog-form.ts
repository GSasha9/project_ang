import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Button } from '@shared/components/button/button';
import { BlogPostData } from '@shared/models/blog-post-data.model';

@Component({
  selector: 'app-blog-form',
  imports: [FormsModule, Button],
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

  model: BlogPostData = {
    id: 0,
    meta: {
      time: '',
      date: '',
    },
    title: '',
    text: '',
    img: '',
    author: {
      name: '',
      pic: '',
    },
  };

  submitted = false;

  onFileChange = (event: Event): void => {
    const inputFile = event.target as HTMLInputElement;

    if (!inputFile.files || !inputFile.files[0]) {
      return;
    }

    const file = inputFile.files[0];
    this.model.img = URL.createObjectURL(file);
  };

  onSubmit = (form: NgForm): void => {
    const date = new Date();
    this.model.id = Date.now();

    this.model.meta = {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };

    this.model.author.name = this.author().name || 'Anonymous';

    this.model.author.pic = this.author().pic || '/project_ang/user.png';

    this.onSubmitForm()?.({ ...this.model });

    form.resetForm({
      title: '',
      text: '',
      img: '',
    });
  };
}
