import { getJestProjects } from '@nrwl/jest';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).ngJest = {
  skipNgcc: true,
  tsconfig: 'tsconfig.spec.json', // this is the project root tsconfig
};

export default {
  globalSetup: 'jest-preset-angular/global-setup',
  projects: getJestProjects(),
};
