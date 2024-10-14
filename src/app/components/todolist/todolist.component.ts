import {
  Component,
  EventEmitter,
  inject,
  input,
  Output,
  Signal,
  signal,
} from '@angular/core';
import { Task } from '../../models/tasks.model';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-todolist',
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
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent {
  public taskslist = input<Task[]>([]);

  @Output() public editTask = new EventEmitter<Task>(); // Emit for edit
  @Output() public deleteTask = new EventEmitter<number>(); // Emit delete

  public editedTasks: Set<number> = new Set();

  public onEditTask(task: Task): void {
    this.editTask.emit(task);
  }

  public onDeleteTask(taskId: number): void {
    this.deleteTask.emit(taskId);
  }

  public startEditing(taskId: number): void {
    this.editedTasks.add(taskId);
  }

  public stopEditing(taskId: number): void {
    this.editedTasks.delete(taskId);
  }

  public isTaskEdited(taskId: number): boolean {
    return this.editedTasks.has(taskId);
  }
}
