import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Contact } from '../../interfaces/contact.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form-modal.component.html'
})
export class ContactFormComponent implements OnInit {
  @Input() contact?: Contact;
  contactForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public activeModal: NgbActiveModal
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{11,12}$')
      ]]
    });
  }

  ngOnInit() {
    if (this.contact) {
      this.isEditing = true;
      this.contactForm.patchValue({
        name: this.contact.name,
        phone: this.contact.phone
      });
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      if (this.isEditing && this.contact?._id) {
        this.apiService.updateContact(this.contact._id, this.contactForm.value).subscribe({
          next: () => {
            this.activeModal.close(true);
          },
          error: (error) => console.error('Error actualizando contacto:', error)
        });
      } else {
        this.apiService.createContact(this.contactForm.value).subscribe({
          next: () => {
            this.activeModal.close(true);
          },
          error: (error) => console.error('Error creando contacto:', error)
        });
      }
    }
  }
}
