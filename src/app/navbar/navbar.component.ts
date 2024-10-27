import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

interface NavItem {
  path: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    NgbCollapseModule
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isMenuCollapsed = true;

  constructor(public authService: AuthService) {}

  navItems: NavItem[] = [
    { path: '/contacts', label: 'Contactos' },
    { path: '/alert', label: 'Mensaje' }
  ];
}
