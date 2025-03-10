/**
 * Sets the environment
 */
import { config } from 'dotenv';

export const CI = Boolean(process.env.CI);

/**
 * Switch the environment based on the CI environment variable
 * just in case it is executed on CI with github actions for instance, I have added this function to handled CI and local execution.
 */
function switchEnvironment() {
  if (!CI) {
    config({ path: 'playwright/environment/.env' });
  }
}

switchEnvironment();
