let testMatch = ['**/?(*.)+(spec).[jt]s?(x)']
var debug = require('debug')('test:jsconfig')

module.exports = {
	verbose: true,
	testTimeout: Number(process.env.TEST_CASE_TIMEOUT) || 360000,
	testEnvironment: './environment.ts',
	testMatch: testMatch,
	setupFilesAfterEnv: [],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
}
