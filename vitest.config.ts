import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		environment: 'jsdom',
		setupFiles: 'vitest.setup.ts',
		include: ['**/__tests__/**/*.test.{ts,tsx,js,jsx}', '**/*.test.{ts,tsx,js,jsx}'],
		globals: true,
		css: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'lcov'],
			all: true,
			// only include files under src/ in the coverage calculation
			include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'],
			// exclude tests, types, and config files
			exclude: [
				'**/__tests__/**',
				'**/*.d.ts',
				'src/app/**',
				'vite.config.ts',
				'postcss.config.mjs',
				'next.config.ts',
				'src/middleware.ts',
				'src/schemas/**',
				'src/**/index.{ts,tsx,js,jsx}',
				'src/lib/**',
			],
		},
	},
});
