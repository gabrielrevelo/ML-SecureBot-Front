import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Contact } from '../../interfaces/contact.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactFormComponent } from '../contact-form-modal/contact-form-modal.component';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts-list.component.html'
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.apiService.getContacts().subscribe({
      next: (response: any) => {
        this.contacts = response.data.contacts;
      },
      error: (error: Error) => console.error('Error cargando contactos:', error)
    });
  }

  toggleExclude(contact: Contact) {
    if (contact._id) {
      this.apiService.updateContact(contact._id, {
        exclude: !contact.exclude
      }).subscribe({
        next: () => {
          this.loadContacts();
        },
        error: (error: Error) => console.error('Error actualizando estado de exclusión:', error)
      });
    }
  }

  deleteContact(id: string) {
    if(confirm('¿Estás seguro de eliminar este contacto?')) {
      this.apiService.deleteContact(id).subscribe({
        next: () => this.loadContacts(),
        error: (error: Error) => console.error('Error eliminando contacto:', error)
      });
    }
  }

  openContactModal(contact?: Contact) {
    const modalRef = this.modalService.open(ContactFormComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
      centered: true
    });

    modalRef.componentInstance.contact = contact;

    modalRef.closed.subscribe(result => {
      if (result) {
        this.loadContacts();
      }
    });
  }
}
