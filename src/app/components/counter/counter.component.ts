import { Component, input, model } from '@angular/core';

@Component({
  styleUrl: './counter.component.scss',
  selector: 'app-counter',
  template: `
    <span>{{ hello() }}</span>
    <button (click)="decrement()">-</button>
    <span>Current Count: {{ counter() }}</span>
    <button (click)="increment()">+</button>
  `,
  standalone: true,
})
export class CounterComponent {
  counter = model(0);
  hello = input('Hi', { alias: 'greeting' });
  increment() {
    this.counter.set(this.counter() + 1);
  }

  decrement() {
    this.counter.set(this.counter() - 1);
  }
}
