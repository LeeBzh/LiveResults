import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Runner } from './models/runner';

@Injectable({
  providedIn: 'root'
})
export class RunnerService {
  private readonly apiUrl = 'http://localhost:3000/api/runners';
  private readonly http: HttpClient = inject(HttpClient)

  getRunners(): Observable<Runner[]> {
    return this.http.get<Runner[]>(this.apiUrl);
  }

  addRunner(runnerData: Runner): Observable<string> {
    return this.http.post(this.apiUrl, runnerData, { responseType: 'text' });
  }

  saveRunnerTime(runnerData: any): Observable<string> {
    return this.http.post(this.apiUrl, runnerData, { responseType: 'text' });
  }

}
