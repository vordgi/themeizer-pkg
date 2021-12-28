// @ts-check
/** @type {typeof import('eslint/conf/config-schema').definitions.objectConfig.properties} */
module.exports = {
	env: {
		browser: true,
		es2020: true
	},
	ignorePatterns: ["dist/**"],
	extends: [
		'eslint:recommended',
		'standard',
		'plugin:@typescript-eslint/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 11,
		sourceType: 'module'
	},
	plugins: [
		'@typescript-eslint'
	],
	rules: {
		indent: [0, 'tab'],
		'linebreak-style': [0, 'unix'],
		quotes: [0, 'single'],
		'no-tabs': 0,
		'no-new': 0,
		semi: [0, 'always'],
		camelcase: 0,
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'@typescript-eslint/member-delimiter-style': [0, {
			multiline: {
				delimiter: 'semi',
				requireLast: true
			},
			singleline: {
				delimiter: 'semi',
				requireLast: false
			},
			multilineDetection: 'brackets'
		}]
	}
};
