import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Task } from '../models/tasks.model';
import { compileClassMetadata } from '@angular/compiler';
import { TasksStoreService } from './tasks-store.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}
  public tasksService = inject(TasksStoreService);

  public async getTasks() {
    try {
      const response = await fetch('http://localhost:3001/todos');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('data :>> ', data);
      this.tasksService.tasks.set([...this.tasksService.tasks(), ...data]); // Update datas
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  public async saveTasks(taskToSave: Task) {
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskToSave),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      this.tasksService.tasks.update((list) => [...list, taskToSave]); // Update datas
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  public async deleteTask(taskId: number) {
    try {
      const response = await fetch(`http://localhost:3001/todos/${taskId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const updatedTasks = this.tasksService
        .tasks()
        .filter((task) => task.id !== taskId);
      this.tasksService.tasks.set(updatedTasks);
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  public async editTask(taskToUpdate: Task) {
    try {
      delete taskToUpdate.isEdited; // remove isEdited unnecessary properties
      const response = await fetch(
        `http://localhost:3001/todos/${taskToUpdate.id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskToUpdate),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const updatedTasks = this.tasksService.tasks().filter(
        (task:Task) => task.id !== taskToUpdate.id
      );
      this.tasksService.tasks.update((list: Task[]) => [...updatedTasks, taskToUpdate]); // Update datas

      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
}
