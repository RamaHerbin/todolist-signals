import { Task } from '../../models/tasks.model';

import { TodolistComponent } from './todolist.component';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import createSpy = jasmine.createSpy;

describe('TodolistComponent', () => {

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

  const sendValue = (value: any) => {
    console.log('value :>> ', value);
  };

  it('should create the component', async () => {
    await render(TodolistComponent);
    // screen.debug();
    const element = screen.getByRole('todolist');
    expect(element).toBeInTheDocument();
  });

  it('should display the list if there is at least one element', async () => {
    await render(TodolistComponent, { inputs: {taskslist: mockTasks } });

    let result = screen.getByText('Do the dishes');

    expect(result).toBeTruthy();
  });

  it('should emit editTask event when editing a task', async () => {
    const mockTask: Task[] = [
      { id: 1, name: 'Do the dishes', done: false },
    ];
    const editSpy = jasmine.createSpy('editTask');

    const { fixture } = await render(TodolistComponent, {
      inputs: { taskslist: mockTask },
      on: {
        editTask: editSpy
      }
    });

    // Click on edit button
    const editButton = screen.getByRole('edit-button');
    editButton.click();

    // wait for changes
    fixture.detectChanges();

    const validateButton = screen.getByRole('validate-button');
    validateButton.click();

    expect(editSpy).toHaveBeenCalledWith(mockTask[0]);
  });

  it('should emit delete event when deleting a task', async () => {
    const mockTask: Task[] = [
      { id: 1, name: 'Do the dishes', done: false },
    ];
    const deleteSpy = jasmine.createSpy('deleteTask');

    const { fixture } = await render(TodolistComponent, {
      inputs: { taskslist: mockTask },
      on: {
        deleteTask: deleteSpy
      }
    });

    // Click on edit button
    const deleteButton = screen.getByRole('delete-button');
    deleteButton.click();

    expect(deleteSpy).toHaveBeenCalledWith(mockTask[0].id);
  });
});
