import { defineConfig, devices } from '@playwright/test';

const config = defineConfig({
  globalSetup: require.resolve('./global-setup.js'),
  globalTeardown: require.resolve('./global-teardown.js'),
  timeout: 30000,
  use: {
    trace: 'on-first-retry',// 'on',
    // headless: false
  },
  //testIgnore: '**/account.changePassword.spec.js',
  reporter: [
    ['html', { open: 'never' }],//'on-failure' }], // HTML отчет
    ['junit', { outputFile: 'reports/junit-report.xml' }]            // JUnit отчет
  ],

  projects: [
    {
      name: 'respin',
      testMatch: ['**/**.spec.js'],
      use: {
        baseURL: '********',
        testDir: './tests',
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'pwc',
      testMatch: ['**/**.spec.js'],
      use: {
        baseURL: '*********',
        folder: 'pwc',
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'cb',
      testMatch: ['**/**.spec.js'],
      use: {
        baseURL: '************',
        folder: 'cb',
        ...devices['Desktop Chrome']
      },
    },
  ]
});



module.exports = config;
