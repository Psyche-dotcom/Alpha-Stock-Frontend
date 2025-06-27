"use client";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Disable 'unused variables' rule
      "@typescript-eslint/no-explicit-any": "off", // Disable 'explicit any' rule
      "@typescript-eslint/no-empty-function": "off", // Disable 'empty functions' rule
      "@typescript-eslint/no-empty-interface": "off", // Disable 'empty interfaces' rule
      "@typescript-eslint/no-unsafe-function-type": "off", // Disable 'unsafe function types' rule
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-this-alias": "off", // Disable the rule globally
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
