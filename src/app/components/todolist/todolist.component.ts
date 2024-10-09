import { Component, Input } from '@angular/core';
import { Task } from '../../models/tasks.model';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.scss',
})
export class TodolistComponent {
  // @Input() public taskslist = signal<Task[]>([]);
}
