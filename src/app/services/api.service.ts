import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../interfaces/contact.interface';
import { Alert } from '../interfaces/alert.interface';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://y8k8cw04o00kw8scwocssws8.72.60.227.89.sslip.io//v1';

  constructor(private http: HttpClient) { }

  sendAlert(alert: Alert): Observable<any> {
    return this.http.post(`${this.baseUrl}/alert`, alert);
  }

  createContact(contact: Contact): Observable<any> {
    return this.http.post(`${this.baseUrl}/contacts`, contact);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}/contacts`);
  }

  updateContact(id: string, contact: Partial<Contact>): Observable<any> {
    return this.http.put(`${this.baseUrl}/contacts/${id}`, contact);
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/contacts/${id}`);
  }

  getSessionStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/whatsapp/session-status`);
  }

  getQRCode(): Observable<any> {
    return this.http.get(`${this.baseUrl}/whatsapp/qr`);
  }
}
