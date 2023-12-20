import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../services/goals.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

export interface GoalsList {
  title: string;
  description: string;
}

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.css'],
})
export class GoalsListComponent implements OnInit {
  goalsList: GoalsList[] = [];
  goalsListArray: any = new Subject();
  goalsForm!: FormGroup;

  constructor(private fb: FormBuilder, private goalsService: GoalsService) {
    this.goalsForm = this.fb.group({
      goals: this.fb.array([]),
    });

    this.goalsService.getGoals().subscribe(
      (data) => {
        data.data.forEach((element: GoalsList) => {
          this.goalsList.push(element);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.getGoalsListArray().subscribe((data: GoalsList) => {
      this.goalsList.push(data);
    });
  }

  getGoalsListArray() {
    return this.goalsListArray.asObservable();
  }

  deleteGoals(index: number) {
    this.goalsList.splice(index, 1);
    this.goalsService.deleteGoals().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  goals(): FormArray {
    return this.goalsForm.get('goals') as FormArray;
  }

  newGoal(): FormGroup {
    return this.fb.group({
      title: '',
      description: '',
    });
  }

  addGoal() {
    this.goals().push(this.newGoal());
  }

  removeGoal(i: number) {
    this.goals().removeAt(i);
  }

  onSubmit() {
    console.log(this.goalsForm.value);
    for (var i = 0; i < this.goalsForm.value.goals.length; i++) {
      this.goalsListArray.next(this.goalsForm.value.goals[i]);
    }
    this.goalsService.addGoals(this.goalsForm.value).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.goalsForm.reset();
  }
}
function GetMapping(arg0: string) {
  throw new Error('Function not implemented.');
}

function CrossOrigin(arg0: string) {
  throw new Error('Function not implemented.');
}
