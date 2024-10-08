import { Component, inject, Input, TemplateRef } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/tasks.model';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTabsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  @Input() myFragment: TemplateRef<unknown> | undefined;

  constructor() {}

  public inputAdd = '';
  public signalsService = inject(CommonService);

  public ngOnInit() {
    this.signalsService.getTasks();
  }

  // public tasks: Array<Task> = [];

  public deleteTask(index: number) {
    console.log('index :>> ', index);
  }

  public addTask(taskName: string) {
    this.signalsService.tasks.update((tasks: Array<Task>) => [
      ...tasks,
      {
        name: taskName,
        done: false,
      },
    ]);
  }
}
