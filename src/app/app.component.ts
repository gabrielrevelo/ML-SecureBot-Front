import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'ML-SecureBot-Front';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  login(username: string, password: string): void {
    if (this.authService.login(username, password)) {
      console.log('Login exitoso');
      this.router.navigate(['/whatsapp']);
    } else {
      console.log('Credenciales inválidas');
    }
  }
}
