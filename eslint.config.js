// @ts-check

const globals = require("globals");
const js = require("@eslint/js");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  {
    // This configuration applies to all files ESLint processes by default.
    // Specific configurations for subsets of files can be added later if needed.
    ignores: ["eslint.config.js", "node_modules/**"], // Ignore this config file and node_modules
  },
  js.configs.recommended, // ESLint's recommended configurations
  prettierConfig, // Disables ESLint rules that would conflict with Prettier
  {
    // This object applies to all files not caught by more specific configurations below,
    // effectively setting defaults for the project.
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script", // Indicates that JS files are scripts, not ES modules
      globals: {
        ...globals.browser, // Adds all standard browser global variables
        // Project-specific global variables:
        // These are variables defined in one script file and used in others.
        // 'readonly' means ESLint will warn if an attempt is made to overwrite them.
        // 'writable' would allow them to be overwritten.
        elements: "readonly",
        dom: "readonly",
        render: "readonly",
        utils: "readonly",
        catalogIndex: "readonly",
        catalogData: "readonly",
        catalogRating: "readonly",
        cartIndex: "readonly",
        cartData: "readonly",
        cartSummary: "readonly",
        authLogin: "readonly",
      },
    },
    rules: {
      // Customize ESLint rules here
      "no-console": "warn", // Warns about the use of console.log, console.error, etc.
      "curly": ["error", "all"], // Requires curly braces for all control statements (if, else, for, while)
      "eqeqeq": ["error", "always"], // Requires the use of === and !== instead of == and !=
      "no-unused-vars": ["warn", {
        "vars": "all", // Check all variables for usage
        "args": "after-used", // Check arguments after the last use
        "ignoreRestSiblings": true,
        "varsIgnorePattern": "^_", // Allows unused variables that start with an underscore
        "argsIgnorePattern": "^_" // Allows unused arguments that start with an underscore
      }],
      // The `no-redeclare` rule is part of js.configs.recommended.
      // If it causes issues with how globals are defined (e.g. `const utils = {}` in one file
      // and `utils` also listed in `globals`), it means ESLint sees it as a redeclaration.
      // This typically doesn't happen if `sourceType: "script"` is correctly handled and
      // the variable is truly global to that script.
      // One common pattern to avoid this is to wrap each script's contents in an IIFE,
      // and explicitly attach to a single global app object if needed.
      // For now, we assume the current setup with `const` at top-level of scripts
      // and listing them in `globals` will work for `no-undef` and not trigger `no-redeclare`.
    },
  },
  // Example of a more specific configuration, if needed later:
  // {
  //   files: ["assets/js/components/**/*.js"], // Apply only to component JS files
  //   rules: {
  //     // component-specific rules
  //   }
  // }
];
