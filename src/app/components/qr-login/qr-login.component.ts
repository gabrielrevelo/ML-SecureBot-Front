import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-qr-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qr-login.component.html',
  styleUrls: ['./qr-login.component.css']
})
export class QrLoginComponent implements OnInit, OnDestroy {
  qrImage: string | null = null;
  sessionActive = false;
  loading = true;
  error: string | null = null;
  private subscription?: Subscription;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.checkStatus();
    
    this.subscription = interval(5000)
      .pipe(
        switchMap(() => this.apiService.getSessionStatus())
      )
      .subscribe({
        next: (status) => this.handleStatus(status),
        error: (err) => {
          console.error('Error checking status:', err);
          this.error = 'Error al verificar el estado de la sesión';
          this.loading = false;
        }
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  checkStatus() {
    this.loading = true;
    this.error = null;
    
    this.apiService.getSessionStatus().subscribe({
      next: (status) => this.handleStatus(status),
      error: (err) => {
        console.error('Error checking status:', err);
        this.error = 'Error al verificar el estado de la sesión';
        this.loading = false;
      }
    });
  }

  handleStatus(status: any) {
    this.sessionActive = status.active;
    
    if (!status.active && status.hasQR) {
      this.loadQR();
    } else {
      this.qrImage = null;
      this.loading = false;
    }
  }

  loadQR() {
    this.apiService.getQRCode().subscribe({
      next: (data) => {
        this.qrImage = data.qr;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading QR:', err);
        this.qrImage = null;
        this.error = 'QR no disponible en este momento';
        this.loading = false;
      }
    });
  }
}
