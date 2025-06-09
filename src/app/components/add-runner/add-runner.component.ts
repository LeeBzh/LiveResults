import { Component, inject} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RunnerService } from '../../runner-service.service';
import { Category } from '../../models/category.enum';
import { Runner, Sexe } from '../../models/runner';
import { CommonModule } from '@angular/common';
import { Club } from '../../models/club.enum';

@Component({
  selector: 'app-add-runner',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-runner.component.html',
  styleUrl: './add-runner.component.css'
})
export class AddRunnerComponent {
  private readonly runnerService = inject(RunnerService);
  private readonly timeByDefault : string = '00:00:00';
  private readonly classementByDefault : number = 0 ;
  categories = Object.values(Category);
  sexes = Object.values(Sexe);
  clubs = Object.values(Club);

  runnerForm = new FormGroup({
    bibNumber: new FormControl<number>(0, { validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    category: new FormControl<Category>(Category.SevenEight, { nonNullable: true }),
    sexe: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    club: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    });

  onSubmit() {
    if (this.runnerForm.valid) {
      const rawValue = this.runnerForm.getRawValue();
      const runnerData: Runner = {
        bibNumber: rawValue.bibNumber ?? 0,
        lastName: rawValue.lastName,
        firstName: rawValue.firstName,
        category: rawValue.category,
        sexe: rawValue.sexe,
        club: rawValue.club,
        time: this.timeByDefault,
        classement: this.classementByDefault,
      };

      this.runnerService.addRunner(runnerData).subscribe({
        next: () => alert('Runner added successfully!'),
        error: (error) => console.error('Error adding runner:', error)
      });
    } else {
      this.runnerForm.markAllAsTouched();
    }
  }
}
