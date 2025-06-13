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

  sortRunnersByTime() {
    // D'abord, filtrer les coureurs par catégorie si une catégorie est sélectionnée
    let runnersToSort = this.selectedCategory === ''
      ? [...this.runners]
      : this.runners.filter(runner => runner.category === this.selectedCategory);

    // Trier les coureurs par temps
    runnersToSort.sort((a, b) => {
      const timeA = this.convertTimeToSeconds(a.time);
      const timeB = this.convertTimeToSeconds(b.time);
      return timeA - timeB;
    });

    // Mettre à jour le classement pour chaque catégorie
    const categoryRankings: { [key: string]: number } = {};

    runnersToSort.forEach(runner => {
      if (runner.category in categoryRankings) {
        categoryRankings[runner.category] += 1;
      } else {
        categoryRankings[runner.category] = 1;
      }
      runner.classement = categoryRankings[runner.category];
    });

    // Mettre à jour le tableau filtré avec les coureurs triés et classés
    this.filteredRunners = runnersToSort;
  }

  convertTimeToSeconds(time: string | undefined): number {
    if (time === undefined||time ==='00:00:00') {
      return Infinity;
    }
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

}

