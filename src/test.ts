import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
// @ts-ignore
import JasmineDOM from '@testing-library/jasmine-dom';

// Install custom matchers from jasmine-dom
beforeEach(() => {
  jasmine.addMatchers(JasmineDOM);
});

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {},
);
