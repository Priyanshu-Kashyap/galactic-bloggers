import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavigationEnd, Router, Event } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isBlog: boolean;
  constructor(private auth: AuthService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.isBlog = event.url === ('/explore' || '/profile');
      }
    });
  }

  show: boolean = false;
  navLinks: string[] = ['home', 'explore', 'activity'];
  ngOnInit(): void {}
  get userAuth() {
    return this.auth;
  }
}
