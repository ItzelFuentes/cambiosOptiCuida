import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {
  private inactivityTimer: any;
  private secondsRemaining: number = 50;
  private eventSubscriptions: Subscription[] = [];

  constructor(private router: Router) { }

  startTimer(): void {
    if (!localStorage.getItem('token')) {
      return;
    }

    this.inactivityTimer = setInterval(() => {
      this.secondsRemaining--;
      console.log('Segundos restantes:', this.secondsRemaining);
      if (this.secondsRemaining === 0) {
        this.resetTimer();
        this.removeToken();
        this.reloadPage();
      }
    }, 1000);

    const events = ['mousemove', 'mousedown', 'keypress', 'touchstart'];
    events.forEach(event => {
      const subscription = fromEvent(document, event).subscribe(() => {
        this.resetTimer();
      });
      this.eventSubscriptions.push(subscription);
    });
  }

  resetTimer(): void {
    clearInterval(this.inactivityTimer);
    this.secondsRemaining = 50;
    this.clearEventSubscriptions();
    this.startTimer();
  }
  
  clearEventSubscriptions(): void {
    this.eventSubscriptions.forEach(subscription => subscription.unsubscribe());
    this.eventSubscriptions = [];
  }

  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
  }

  reloadPage(): void {
    this.router.navigate(['/Inicio']).then(() => {
      window.location.reload();
    });
  }

  ngOnDestroy() {
    this.eventSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
