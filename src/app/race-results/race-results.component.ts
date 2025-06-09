import { Runner } from './../models/runner';
import { Component, inject } from '@angular/core';
import { RunnerService } from '../runner-service.service';
import { Category } from '../models/category.enum';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-race-results',
  templateUrl: './race-results.component.html',
  styleUrls: ['./race-results.component.css']
})
export class RaceResultsComponent {
  runners: Runner[] = [];
  filteredRunners: Runner[] = [];
  categories = Object.values(Category);
  selectedCategory: Category | '' = '';

  runnerService = inject(RunnerService);


  ngOnInit(): void {
    this.runnerService.getRunners().subscribe({
      next: (data) => {
        this.runners = data;
        this.filteredRunners = [...this.runners];
        console.log(this.runners);
      },
      error: (error) => {
        console.error('Error fetching runners:', error);
      }
    });
  }

  filterRunners() {
    if (this.selectedCategory === '') {
      this.filteredRunners = [...this.runners];
    } else {
      this.filteredRunners = this.runners.filter(runner => runner.category === this.selectedCategory);
    }
  }

  trackByBibNumber(index: number, runner: Runner): number {
    return runner.bibNumber;
  }

}

