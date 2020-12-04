import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';
import { Blog } from '../../core/models/blog';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  bid: string;
  blog: Blog;
  user: User;
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.bid = this.route.snapshot.paramMap.get('bid');
    this.blogService.viewBlog(this.bid).subscribe((blog) => {
      this.blog = blog[0];
      this.auth.getUser(this.blog.uid).subscribe((user) => {
        this.user = user;
      });
    });
  }
}
