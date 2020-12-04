import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService) {}
  loggedIn;
  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.loggedIn = user;
    });
  }
}
