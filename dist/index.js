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
export default function unify(module) {
    // Check if the module is a typical module object with a 'default' property.
    // The `hasOwnProperty` check is crucial to ensure we're not looking at a property
    // from the object's prototype chain.
    if (module && typeof module === 'object' && Object.prototype.hasOwnProperty.call(module, 'default')) {
        // The main export is whatever was exported as default.
        // This could be a function, an object, a class, a primitive, etc.
        const mainExport = module.default;
        // We can only attach properties to objects and functions.
        // If the default export is a primitive (string, number, boolean), we can't
        // add properties to it, so we just return it as is.
        if ((typeof mainExport === 'object' && mainExport !== null) || typeof mainExport === 'function') {
            // Iterate over all the keys in the original module object.
            for (const key in module) {
                // We want to copy every named export, so we skip the 'default' key itself.
                // We also use `hasOwnProperty` again for safety.
                if (key !== 'default' && Object.prototype.hasOwnProperty.call(module, key)) {
                    // Attach the named export as a property onto the main (default) export.
                    mainExport[key] = module[key];
                }
            }
        }
        return mainExport;
    }
    // If the input isn't a standard module object with a default export,
    // we return it untouched. This makes the function safe to use even if
    // the import doesn't have a default export.
    return module;
}
