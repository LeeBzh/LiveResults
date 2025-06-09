import { TimerService } from '../timer.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-race-timer',
  templateUrl: './race-timer.component.html',
  styleUrls: ['./race-timer.component.css']
})
export class RaceTimerComponent {
  elapsedTime = 0;
  private timer: any;
  private startTime!: number;
  isRunning = false;
  isFinished = false;

  private readonly timerService = inject(TimerService)

  ngOnInit(): void {
    this.timerService.elapsedTime$.subscribe(time => {
      this.elapsedTime = time;
    });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startStopTimer(): void {
    if (this.isRunning) {
      clearInterval(this.timer);
    } else {
      this.startTime = Date.now() - this.elapsedTime;
      this.timer = setInterval(() => {
        this.elapsedTime = Date.now() - (this.startTime || 0);
        this.timerService.updateElapsedTime(this.elapsedTime);
      }, 100);
    }
    this.isRunning = !this.isRunning;
  }

  finishTimer(): void {
    const isConfirmed = confirm("Êtes-vous sûr de vouloir réinitialiser le chronomètre ?");

    if (isConfirmed) {
      this.isRunning = false;
      this.isFinished = true;
      clearInterval(this.timer);
      this.elapsedTime = 0;
    }
  }

  formatTime(time: number): string {
    const date = new Date(time);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
}
