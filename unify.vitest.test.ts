import { describe, it, expect } from 'vitest';
import unify from './index';

// Mock Module 1: Default export is a function
const mockModuleFunc = {
  default: () => 'hello from default',
  version: '1.0.0',
  author: 'Vitest',
};

// Mock Module 2: Default export is an object
const mockModuleObj = {
  default: {
    name: 'My Library',
    init: () => true,
  },
  someUtil: () => 'utility function',
};

// Mock Module 3: Default export is a primitive
const mockModulePrimitive = {
  default: 'a-string-value',
  metadata: { tag: 'v1' },
};

// Mock Module 4: No default export
const mockModuleNoDefault = {
  namedExport: 'only named',
  another: 456,
};

describe('unify-exports with Vitest', () => {
  it('should unify a module with a default function and named exports', () => {
    const unified = unify(mockModuleFunc);

    expect(typeof unified).toBe('function');
    expect(unified()).toBe('hello from default');
    expect(unified.version).toBe('1.0.0');
    expect(unified.author).toBe('Vitest');
  });

  it('should unify a module with a default object and named exports', () => {
    const unified = unify(mockModuleObj);

    expect(typeof unified).toBe('object');
    expect(unified.name).toBe('My Library');
    expect(unified.init()).toBe(true);
    expect(typeof unified.someUtil).toBe('function');
    expect(unified.someUtil()).toBe('utility function');
  });

  it('should return the primitive default export without attaching properties', () => {
    const unified = unify(mockModulePrimitive);

    expect(typeof unified).toBe('string');
    expect(unified).toBe('a-string-value');
    // @ts-expect-error
    expect(unified.metadata).toBeUndefined();
  });

  it('should return the module as-is when there is no default export', () => {
    const unified = unify(mockModuleNoDefault);

    expect(typeof unified).toBe('object');
    expect(unified.default).toBeUndefined();
    expect(unified.namedExport).toBe('only named');
    expect(unified.another).toBe(456);
  });
});