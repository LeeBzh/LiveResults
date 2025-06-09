import { Component, inject } from '@angular/core';
import { Runner } from '../../models/runner';
import { RunnerService } from '../../runner-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-runners',
  imports: [CommonModule, RouterLink],
  templateUrl: './runners.component.html',
  styleUrl: './runners.component.css'
})
export class RunnersComponent {
  runners!: Runner[];
  showAddRunnerForm = false;
  private readonly runnerService = inject(RunnerService);


  ngOnInit(): void {
    this.runnerService.getRunners().subscribe({
      next: (runners: Runner[]) => this.runners = runners,
      error: (err: Error) => console.error("Erreur", err)
    })
    }

}
