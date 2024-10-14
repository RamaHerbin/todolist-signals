import { Component, inject, Input, TemplateRef } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

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
import { TodolistComponent } from '../../components/todolist/todolist.component';
import { TasksStoreService } from '../../services/tasks-store.service';

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
    TodolistComponent,
    MatButtonToggleModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  public inputAdd = '';
  tabControl = new FormControl('all');

  constructor() {}

  public commonService = inject(CommonService);
  public tasksService = inject(TasksStoreService);

  public taskslist: Task[] = [];

  public ngOnInit() {
    if (this.tasksService.tasks().length == 0) {
      this.commonService.getTasks();
    }

    this.tabControl.valueChanges.subscribe(() => {
      this.updateTaskList(); // Update list when filter change
    });
  }

  public updateTaskList() {
    const filterValue = this.tabControl.value;

    if (filterValue === 'all') {
      this.taskslist = this.tasksService.tasks();
    } else if (filterValue === 'todo') {
      this.taskslist = this.tasksService.tasksTodo();
    } else if (filterValue === 'done') {
      this.taskslist = this.tasksService.tasksDone();
    }
  }

  public addTask() {
    const newTask: Task = {
      id: this.tasksService.tasks().length + 1,
      name: this.inputAdd,
      done: false,
    };
    this.commonService.saveTasks(newTask);
    this.tasksService.tasks.set([...this.tasksService.tasks(), newTask]);
    this.inputAdd = ''; // Reset  input
    this.updateTaskList(); // Update list after added
  }

  public editTask(task: Task) {
    this.commonService.editTask(task); // Call the service output method
    this.updateTaskList(); // Update
  }

  public deleteTask(taskId: number) {
    this.commonService.deleteTask(taskId);
    this.tasksService.tasks.set(
      this.tasksService.tasks().filter((task) => task.id !== taskId)
    );
    this.updateTaskList(); //Update list
  }
}
