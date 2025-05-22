import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  currentRoute = '';
  isHome: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }
  
  getBackgroundColor() {
    if (this.router.url === '/home') {
      this.isHome = true
      return 'transparent'
    }
    else {
      this.isHome = false
      return 'white'};
  }

  goHome() { 
    this.router.navigate(['/home']);
    this.isHome = true
  }
}
