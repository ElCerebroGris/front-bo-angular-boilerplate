import { Component, OnInit, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    NavbarComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'bo-angular-boilerplate';

  isUserOnline = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isUserOnline = this.auth.getUserOnlineStatus();
    this.auth.isUserOnline().subscribe(status => {
      this.isUserOnline = status;
    });
  }
}
