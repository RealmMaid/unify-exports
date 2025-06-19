/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // This is the key fix: We tell Jest to ONLY run files that end
  // with `.jest.test.ts`. This stops it from trying to run your Vitest
  // tests, which was causing the errors.
  testMatch: ['**/*.jest.test.ts'],
  // This transform section is crucial for telling Jest how to handle ESM syntax
  // in your TypeScript test files.
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
  },
  // This mapper helps Jest resolve module imports correctly when using ESM.
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
