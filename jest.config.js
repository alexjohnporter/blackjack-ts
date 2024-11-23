/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  moduleNameMapper: {
    '(.+)\\.js': '$1'
  },
  extensionsToTreatAsEsm: ['.ts'],
  transform: { '^.+\\.ts?$': 'ts-jest' },
  testEnvironment: 'node',
  testRegex: '/src/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343]
        },
        astTransformers: {
          before: [
            {
              path: 'node_modules/ts-jest-mock-import-meta',
            }
          ]
        }
      }
    ]
  }
};