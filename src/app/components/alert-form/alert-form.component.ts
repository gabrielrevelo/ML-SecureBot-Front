import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-alert-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alert-form.component.html'
})
export class AlertFormComponent {
  alertForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.alertForm = this.fb.group({
      message: ['', Validators.required],
      urlMedia: [''],
      phones: ['']
    });
  }

  get hasPhones(): boolean {
    return !!this.alertForm.get('phones')?.value;
  }

  get isMessageValid(): boolean {
    return this.alertForm.get('message')?.valid || false;
  }

  onSubmit() {
    if (this.alertForm.valid) {
      const formValue = this.alertForm.value;
      const alertData = {
        message: formValue.message,
        urlMedia: formValue.urlMedia,
        phones: formValue.phones ? formValue.phones.split(',').map((p: string) => p.trim()) : undefined
      };

      this.apiService.sendAlert(alertData).subscribe({
        next: () => {
          window.alert('Alerta enviada con éxito');
          this.alertForm.reset();
        },
        error: (error) => console.error('Error enviando alerta:', error)
      });
    }
  }

  sendToAllContacts() {
    if (this.isMessageValid) {
      const alertData = {
        message: this.alertForm.get('message')?.value,
        urlMedia: this.alertForm.get('urlMedia')?.value,
        phones: undefined
      };

      this.apiService.sendAlert(alertData).subscribe({
        next: () => {
          window.alert('Alerta enviada a todos los contactos con éxito');
          this.alertForm.reset();
        },
        error: (error) => console.error('Error enviando alerta:', error)
      });
    }
  }
}
