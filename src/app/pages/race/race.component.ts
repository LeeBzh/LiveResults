import { RunnerService } from './../../runner-service.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { RaceTimerComponent } from "../../race-timer/race-timer.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimerService } from '../../timer.service';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

@Component({
  selector: 'app-race',
  imports: [RaceTimerComponent, CommonModule, FormsModule],
  templateUrl: './race.component.html',
  styleUrl: './race.component.css'
})
export class RaceComponent {
  bibNumber: number | undefined;
  category: string | null = null;
  private elapsedTime!: number;
  runners: { bibNumber: number; time: string }[] = [];
  private readonly route = inject(ActivatedRoute);
  private readonly timerService = inject(TimerService);
  private readonly runnerService = inject(RunnerService);

  constructor() {
    this.timerService.elapsedTime$.subscribe(time => {
      this.elapsedTime = time;
    });
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
    });
  }

  saveRunnerTime(): void {
    if (this.bibNumber !== undefined) {
      const formattedTime = this.formatTime(this.elapsedTime);
      const runnerData = {
        bibNumber: this.bibNumber,
        time: formattedTime
      };
      this.runners.push({
        bibNumber: this.bibNumber,
        time: formattedTime
      });
      this.runnerService.saveRunnerTime(runnerData).subscribe({
        next: () => {
          alert('Temps enregistré avec succès !');
          this.bibNumber = undefined;
        },
        error: (error) => console.error('Erreur lors de l\'enregistrement du temps :', error)
      });
    } else {
      alert('Veuillez entrer un numéro de dossard.');
    }
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.saveRunnerTime();
    }
  }

  formatTime(time: number): string {
    const date = new Date(time);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  generatePDF() {
    const doc = new jsPDF();

    doc.text(`Course des ${this.category}`, 14, 15);

    autoTable(doc,{
      head: [['Numéro de dossard', 'Temps']],
      body: this.runners.map(runner => [runner.bibNumber, runner.time]),
      startY: 20
    });

    doc.save(`Enregistrements ${this.category}.pdf`);
  }
}
