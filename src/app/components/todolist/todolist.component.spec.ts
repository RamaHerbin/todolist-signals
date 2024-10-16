import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task } from '../../models/tasks.model';

import { TodolistComponent } from './todolist.component';
import { render, screen } from '@testing-library/angular';

describe('TodolistComponent', () => {
  // let component: TodolistComponent;
  // let fixture: ComponentFixture<TodolistComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [TodolistComponent],
  //   }).compileComponents();
  //
  //   fixture = TestBed.createComponent(TodolistComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  const mockTasks: Task[] = [
    {
      id: 1,
      name: 'Do the dishes',
      done: false,
    },
    {
      id: 2,
      name: 'Go for a walk',
      done: true,
    },
  ];

  const sendValue = (value) => {
    console.log('value :>> ', value);
  }

  it('should display the list if there is at least one element', async () => {
    await render(TodolistComponent, {inputs: { taskslist: [] as Task[] }});

    let result = screen.getByText('Do the dishes');

    expect(result).toBeTruthy();
  });
});
