// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   {
//     ignores: [
//       "node_modules/**",
//       ".next/**",
//       "out/**",
//       "build/**",
//       "next-env.d.ts",
//     ],
//     "rules": {
//       "no-unused-vars": "warn",
//       "react/react-in-jsx-scope": "off"
//     }
//   },
// ];

// export default eslintConfig;


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
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      "react/react-in-jsx-scope": "off", // Next.js doesn’t need React import
      "no-unused-vars": "warn", // Base rule
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // TS-specific unused vars
      "@typescript-eslint/no-explicit-any": "off", // ⬅️ allow `any` without error
    },
  },
];

export default eslintConfig;
