import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Build output and generated files — never our code to fix.
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "coverage/**",
      "next-env.d.ts",
      "public/**",
    ],
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        JSX: "readonly",
      }
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/prop-types": "off",
      // The base rule can't read TypeScript, so it flags parameter names inside
      // type signatures (`onPhoto: (file: File) => void`). The @typescript-eslint
      // version below understands them and stays on.
      "no-unused-vars": "off",
    },
  },
]);
