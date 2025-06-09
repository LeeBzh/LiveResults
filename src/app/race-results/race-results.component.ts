import { Runner } from './../models/runner';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { RunnerService } from '../runner-service.service';

@Component({
  selector: 'app-race-results',
  templateUrl: './race-results.component.html',
  styleUrls: ['./race-results.component.css']
})
export class RaceResultsComponent {
  runners: Runner[] = [];

  runnerService = inject(RunnerService);

  ngOnInit(): void {
    this.runnerService.getRunners().subscribe({
      next: (data) => {
        this.runners = data;
        console.log(this.runners);
      },
      error: (error) => {
        console.error('Error fetching runners:', error);
      }
    });
  }

}

