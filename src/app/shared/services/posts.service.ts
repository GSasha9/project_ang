import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BlogPostData } from '@shared/models/blog-post-data.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private http = inject(HttpClient);

  requestUrl = 'http://localhost:8083/rest/blog';

  getAllPosts(): Observable<BlogPostData[]> {
    return this.http.get<BlogPostData[]>(this.requestUrl);
  }

  createPost(post: BlogPostData): Observable<BlogPostData> {
    return this.http.post<BlogPostData>(this.requestUrl, post);
  }
}
