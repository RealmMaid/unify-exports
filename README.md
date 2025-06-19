Unify Exports
A simple, type-safe utility to stop JavaScript/TypeScript from crying about default and named exports. This package provides a single function to unify them into a single, clean object, which is especially useful when working with dynamic import().

The Problem
When you dynamically import a module that has both a default export and named exports, you get an object that looks like this:

// my-library.js
export default function doCoolThing() { /* ... */ }
export const version = '1.0.0';

// your-code.js
const myLibraryModule = await import('./my-library.js');

/*
myLibraryModule is:
{
  default: [Function: doCoolThing],
  version: '1.0.0'
}
*/

// Using it is annoying:
myLibraryModule.default(); // Call the function
console.log(myLibraryModule.version); // Get the version

This is clunky. You have to access the main function via .default.

The Solution
unify-exports cleans this up. It takes that module object, makes the default export the main thing, and attaches all the other named exports to it, with full TypeScript support.

Installation
npm install unify-exports

Usage with TypeScript
Wrap your dynamic import with unify() to get a perfectly typed, clean module.

import unify from 'unify-exports';

// Dynamically import your library
// TypeScript knows the shape of 'my-library.ts'
const myLibrary = unify(await import('./my-library.ts'));

// `myLibrary` is now perfectly typed as:
// `(() => void) & { version: string }`

// Using it is clean, intuitive, and type-safe:
myLibrary(); // Call the function directly
console.log(myLibrary.version); // Access named exports as properties

Usage with JavaScript
It works exactly the same in JavaScript, just without the compile-time types.

import unify from 'unify-exports';

const myLibrary = unify(await import('./my-library.js'));

myLibrary(); // Call the function directly
console.log(myLibrary.version); // Access named exports as properties

Testing
You can use this package reliably in any test environment. Here are examples for both Vitest and Jest.

Vitest Example
// unify.test.ts
import { describe, it, expect } from 'vitest';
import unify from './index';

describe('unify-exports with Vitest', () => {
  it('should unify a module with a default function and named exports', () => {
    const doThing = () => 'did a thing';
    const mockModule = {
      default: doThing,
      version: '1.0.0',
      author: 'test',
    };

    const unified = unify(mockModule);

    expect(typeof unified).toBe('function');
    expect(unified()).toBe('did a thing');
    expect(unified.version).toBe('1.0.0');
    expect(unified.author).toBe('test');
  });
});

Jest Example
You'll need ts-jest configured for Jest to work with TypeScript files.

// unify.test.ts
import unify from './index';

describe('unify-exports with Jest', () => {
  it('should unify a module with a default object and named exports', () => {
    const myApi = {
      getUser: () => ({ id: 1, name: 'Jest' }),
    };
    const mockModule = {
      default: myApi,
      endpoint: '/api/v1',
    };

    const unified = unify(mockModule);

    expect(typeof unified).toBe('object');
    expect(unified.getUser().name).toBe('Jest');
    expect(unified.endpoint).toBe('/api/v1');
  });
});

It makes your code cleaner and behave the way you'd intuitively expect it to.