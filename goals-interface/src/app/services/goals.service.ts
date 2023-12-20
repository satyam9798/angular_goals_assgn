import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
// import { Observable, Subject } from 'rxjs';

export interface GoalsList {
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  constructor(private http: HttpClient) {}

  getGoals() {
    return this.http.get<any>(`http://localhost:9000/goals`).pipe(
      delay(1000),
      map((response) => {
        return response;
      })
    );
  }

  addGoals(newGoals: GoalsList[]) {
    return this.http.post<any>(`http://localhost:9000/goals`, newGoals).pipe(
      delay(1000),
      map((response) => {
        return response;
      })
    );
  }

  deleteGoals() {
    return this.http.delete<any>(`http://localhost:9000/goals`).pipe(
      delay(1000),
      map((response) => {
        return response;
      })
    );
  }
}
