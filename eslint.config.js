// @ts-check

const globals = require("globals");
const js = require("@eslint/js");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  {
    ignores: ["eslint.config.js", "node_modules/**"],
  },
  js.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // Changed to "module"
      globals: {
        ...globals.browser, // Keep standard browser globals
        // Removed all project-specific globals (elements, dom, utils, etc.)
        // as they are now managed by the ES6 module system.
      },
    },
    rules: {
      "no-console": "warn",
      "curly": ["error", "all"],
      "eqeqeq": ["error", "always"],
      "no-unused-vars": ["warn", {
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": true,
        "varsIgnorePattern": "^_",
        "argsIgnorePattern": "^_"
      }],
      // Add specific module-related rules if needed, e.g., import/order later
    },
  },
];
