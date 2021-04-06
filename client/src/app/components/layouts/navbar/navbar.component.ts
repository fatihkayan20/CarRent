import { User } from './../../../models/user';
import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.setUser();
  }

  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      this.user = this.authService.user;
      return true;
    }
    return false;
  }

  isAdmin() {
    if (this.authService.user.IsAdmin) {
      return true;
    }
    return false;
  }

  setUser() {
    this.authService.setUser();
  }

  logout() {
    this.authService.logout();
  }
}
