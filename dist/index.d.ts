/**
 * A type that extracts the unified type from a module object.
 * It combines the `default` export with all other named exports.
 */
type Unified<T extends Record<string, any>> = T extends {
    default: any;
} ? T['default'] & Omit<T, 'default'> : T;
/**
 * Unifies a module's default and named exports into a single, type-safe entity.
 *
 * This function is designed to solve the common annoyance of dealing with the `.default`
 * property when using dynamic `import()`. It takes a module object, elevates the
 * default export to the top level, and attaches all other named exports as properties onto it.
 *
 * @template T - The type of the module object.
 * @param {T} module The module object, as returned by `import()` or `require()`.
 * @returns {Unified<T>} The default export, now decorated with the named exports.
 * If there's no default export, it returns the module object itself.
 */
export default function unify<T extends Record<string, any>>(module: T): Unified<T>;
export {};
