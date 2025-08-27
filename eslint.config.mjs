import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends('next/core-web-vitals', 'next/typescript')];

// Ensure ESLint (CLI and programmatic) ignores Next.js build output
eslintConfig.unshift({
	ignores: ['**/.next/**', 'coverage', 'node_modules', 'next-env.d.ts'],
});

// Relax some strict rules for test files where usage of `any`, unused
// variables and non-const temporaries is common and acceptable.
eslintConfig.push({
	files: ['src/**/__tests__/**/*.{ts,tsx,js,jsx}', '**/__tests__/**/*.{ts,tsx,js,jsx}'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'prefer-const': 'off',
		// Additional relaxations for common test patterns
		'@next/next/no-img-element': 'off',
		'@typescript-eslint/no-require-imports': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-unsafe-function-type': 'off',
		'@typescript-eslint/no-unused-expressions': 'off',
		'@typescript-eslint/no-unsafe-member-access': 'off',
	},
});

export default eslintConfig;
