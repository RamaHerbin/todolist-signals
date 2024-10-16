import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import {render, screen, fireEvent, aliasedInput} from '@testing-library/angular'

describe('Counter', () => {
  it('should render counter', async () => {
    await render(CounterComponent, {
      inputs: {
        counter: 5,
        // aliases need to be specified using aliasedInput
        ...aliasedInput('greeting', 'Hello Alias!'),
      },
    })

    expect(screen.getByText('Current Count: 5')).toBeVisible()
    expect(screen.getByText('Hello Alias!')).toBeVisible()
  })

  it('should increment the counter on click', async () => {
    await render(CounterComponent, {inputs: {counter: 5}})

    const incrementButton = screen.getByRole('button', {name: '+'})
    fireEvent.click(incrementButton)

    expect(screen.getByText('Current Count: 6')).toBeVisible()
  })
})
