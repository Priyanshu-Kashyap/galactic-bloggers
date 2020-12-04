import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { BlogService } from '../../core/services/blog.service';
import { Blog } from '../../core/models/blog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.scss'],
})
export class WriteBlogComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private blogService: BlogService,
    private fb: FormBuilder
  ) {
    this.auth.user$.subscribe((user) => (this.uid = user.uid));
  }
  uid: string;
  blog: Blog;
  blogPost: FormGroup;
  get title() {
    return this.blogPost.get('title');
  }
  get content() {
    return this.blogPost.get('content');
  }
  ngOnInit(): void {
    this.blogPost = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
  onSubmit() {
    this.blog = {
      title: this.title.value.toLoweCase(),
      content: this.content.value,
      uid: this.uid,
      views: 0,
    };
    return this.blogService.createBlog(this.blog);
  }
}
