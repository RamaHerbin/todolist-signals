import { computed, Injectable, Signal, signal } from '@angular/core';
import { Task } from '../models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TasksStoreService {
  constructor() {}

  public tasks = signal<Task[]>([]);

  public filter = signal<{ state: 'ALL' | 'DONE' | 'TODO' }>({ state: 'ALL' });

  public tasksDone: Signal<Task[]> = computed(() =>
    this.tasks().filter((el) => el.done)
  );

  public tasksTodo: Signal<Task[]> = computed(() =>
    this.tasks().filter((el) => !el.done)
  );
}
