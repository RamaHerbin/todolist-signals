import { Component, inject, Input, Signal, signal } from '@angular/core';
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
  @Input() public taskslist: Signal<Task[]> = signal<Task[]>([]);

  public signalsService = inject(CommonService);
}
