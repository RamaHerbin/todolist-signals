import { Injectable, signal } from '@angular/core';
import { Task } from '../models/tasks.model';
import { compileClassMetadata } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  public tasks = signal<Task[]>([]);

  public async getTasks() {
    try {
      const response = await fetch('http://localhost:3001/todos');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('data :>> ', data);
      this.tasks.set([...this.tasks(), ...data]); // Update datas
      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  public async saveTasks(taskToSave: Task) {
    console.log('taskToSave :>> ', taskToSave);
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
      this.tasks.update((list) => [...list, taskToSave]); // Update datas
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
      const updatedTasks = this.tasks().filter((task) => task.id !== taskId);
      this.tasks.set(updatedTasks);
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
      // const updatedTasks = this.tasks().filter(
      //   (task) => task.id !== taskToUpdate.id
      // );
      // this.tasks.update((list) => [...updatedTasks, taskToUpdate]); // Update datas

      return data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }
}
