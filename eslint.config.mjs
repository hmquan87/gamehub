import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [{
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}, ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"), {
  rules: {
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-expressions": "off",
    "react/no-unescaped-entities": "off",
    "no-console": [
      "warn",
      {
        allow: ["error"],
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "all",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
  },
}];

export default eslintConfig;
