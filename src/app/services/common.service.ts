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
    // return new Promise(async (resolve, reject) => {
    //   const response = await fetch(
    //     'https://jsonplaceholder.typicode.com/todos/1'
    //   );
    //   console.log('response :>> ', response);
    //   return await response.json();
    // });

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
      throw error; // Optionnel : relancer l'erreur pour la gestion ultérieure
    }
  }
}
