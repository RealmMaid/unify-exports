import { defineConfig } from 'vitest/config';

// Vitest is often zero-configuration for simple TypeScript projects,
// but it's good practice to be explicit to avoid conflicts with other test runners.
export default defineConfig({
  test: {
    // By using a specific naming convention, we can tell Vitest to only
    // run files ending in `.vitest.test.ts`. This prevents it from
    // interfering with Jest's test files.
    include: ['**/*.vitest.test.ts'],
  },
});
