import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'angular-jamstack-blog',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './blog',
      },
    },
  },
  puppeteerLaunchOptions: { executablePath: CHROMIUM_PATH },
};
