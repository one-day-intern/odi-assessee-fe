module.exports = {
  collectCoverage: true,
  // on node 14.x coverage provider v8 offers good speed and more or less good report
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    "!**/index.ts",
    "!**/cypress/**",
    '!**/*.d.ts',
    '!**/node_modules/**',
    "!**/pages/**",
    "!**/components/shared/**/svg/**",
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/*.config.js',
    '!<rootDir>/*.config.ts',
    '!<rootDir>/coverage/**',
    '!**/DashboardEvents.ts',
    "!**/mocks/**",
    "!**/Resizers.tsx",
  ],
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    // https://jestjs.io/docs/webpack#mocking-css-modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    // https://jestjs.io/docs/webpack#handling-static-assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,

    // Handle module aliases
    '^@components(.*)$': '<rootDir>/components/$1',
    "^@utils(.*)$": "<rootDir>/utils$1",
    "^@hooks(.*)$": "<rootDir>/hooks$1",
    "^@services(.*)$": "<rootDir>/services$1",
    "^@context(.*)$": "<rootDir>/context$1"
  },
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  testEnvironment: 'jsdom',
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    `/node_modules/(?!${['uuid', '@react-hook'].join('|')})`,
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  setupFilesAfterEnv: ["./jest.setup.ts"]
}

process.env = Object.assign(process.env, {
  NEXT_PUBLIC_BACKEND_URL: 'http://localhost:8000',
});