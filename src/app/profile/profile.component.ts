import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { User } from '../core/models/user';
import { Router, Event, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User;
  signUp: boolean;
  constructor(private auth: AuthService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.signUp = event.url === '/profile/signup';
      }
    });
  }
  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.user = user;
      if (this.user === null) this.router.navigate(['profile/login']);
    });
  }
  get userAuth() {
    return this.auth;
  }
}
