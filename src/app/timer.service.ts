import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timer: any;
  private isRunning = false;
  private readonly elapsedTime = new BehaviorSubject<number>(0);

  elapsedTime$ = this.elapsedTime.asObservable();

  getTime(): Observable<number> {
    return this.elapsedTime.asObservable();
  }

  startStopTimer(): void {
    if (this.isRunning) {
      clearInterval(this.timer);
    } else {
      const startTime = Date.now() - this.elapsedTime.value;
      this.timer = setInterval(() => {
        const currentElapsedTime = Date.now() - startTime;
        this.elapsedTime.next(currentElapsedTime);
      }, 100);
    }
    this.isRunning = !this.isRunning;
  }

  resetTimer(): void {
    clearInterval(this.timer);
    this.isRunning = false;
    this.elapsedTime.next(0);
  }

  updateElapsedTime(time: number): void {
    this.elapsedTime.next(time);
  }
}
