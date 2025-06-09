import { AddRunnerComponent } from './components/add-runner/add-runner.component';
import { HomeComponent } from './pages/home/home.component';
import { RaceComponent } from './pages/race/race.component';
import { RunnersComponent } from './pages/runners/runners.component';
import { RaceResultsComponent } from './race-results/race-results.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', title: 'Home', component:HomeComponent},
  {path: 'race-results', title: 'Race-results', component: RaceResultsComponent},
  {path: 'runners', title: 'Runners', component: RunnersComponent},
  {path: 'add-runner', title: 'Add-Runner', component: AddRunnerComponent},
  {path: 'race/:category', title: 'Race', component: RaceComponent}
];
