import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'components',
  devServer: {
    openBrowser: false,
  },
  globalStyle: './node_modules/@nngroup/styles/dist/styles.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      // copy: [
      //   {
      //     src: '../../styles/dist/fonts/',
      //     dest: './fonts/',
      //   }
      // ],
    },
  ],
  plugins: [sass()],
  testing: {
    browserHeadless: 'shell',
  },
};
