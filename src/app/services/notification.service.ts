import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8080/api/notifications';
  private pollingInterval = 30000; // 30 secondes

  constructor(private http: HttpClient) {}

  startPolling(): void {
    interval(this.pollingInterval)
      .pipe(switchMap(() => this.getNotifications()))
      .subscribe({
        next: (notifications: any[]) => {
          notifications.forEach(notif => {
            if (!notif.read) {
              this.showNotification(notif.message);
              this.markAsRead(notif.id).subscribe();
            }
          });
        }
      });
  }

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/unread`);
  }

  markAsRead(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/read`, {});
  }

  showNotification(message: string): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Portail UN-CHK', { body: message, icon: '/Logo-UN-CHK.png' });
    }
    this.showToast(message, 'info');
  }

  showSuccess(message: string): void {
    this.showToast(message, 'success');
  }

  showError(message: string): void {
    this.showToast(message, 'danger');
  }

  showWarning(message: string): void {
    this.showToast(message, 'warning');
  }

  showInfo(message: string): void {
    this.showToast(message, 'info');
  }

  requestPermission(): void {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  private showToast(message: string, type: string = 'info'): void {
    const toastContainer = document.querySelector('.toast-container') || this.createToastContainer();
    const toastId = 'toast-' + Date.now();
    
    const iconMap: any = {
      'success': 'bi-check-circle-fill text-success',
      'danger': 'bi-exclamation-circle-fill text-danger',
      'warning': 'bi-exclamation-triangle-fill text-warning',
      'info': 'bi-info-circle-fill text-primary'
    };

    const toastHTML = `
      <div id="${toastId}" class="toast align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <i class="bi ${iconMap[type]} me-2"></i>
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Fermer"></button>
        </div>
      </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(toastId);
    
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
      toast.show();
      toastElement.addEventListener('hidden.bs.toast', () => toastElement.remove());
    }
  }

  private createToastContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
  }
}
