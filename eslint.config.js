import nx from '@nx/eslint-plugin';

export default [
	...nx.configs['flat/base'],
	...nx.configs['flat/typescript'],
	...nx.configs['flat/javascript'],
	...nx.configs['flat/angular'],
	...nx.configs['flat/angular-template'],
	{
		files: ['src/**/*.ts'],
		rules: {
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			],
		},
	},
	{
		ignores: ['src/app/libs/ui/**/*.ts', '**/dist', '**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'],
	},

	{
		files: ['**/*.html'],
		// Override or add rules here
		rules: {},
	},
];
