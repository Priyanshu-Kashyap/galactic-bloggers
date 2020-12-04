import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/core/models/blog';
import { User } from '../../../core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { BlogService } from 'src/app/core/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  constructor(private blogService: BlogService, private auth: AuthService) {}
  blogList: Blog[];
  userDetails: User;
  @Input('uid') uid = '';
  ngOnInit(): void {
    this.blogService.allBlogs(this.uid).subscribe((blogs) => {
      this.blogList = blogs;
      this.user(blogs);
    });
  }
  user(blogs) {
    blogs.forEach((blog) => {
      return this.auth
        .getUser(blog.uid)
        .subscribe((user) => (this.userDetails = user));
    });
  }
}
