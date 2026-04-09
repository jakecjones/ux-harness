import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(ts|tsx)'],
  framework: '@storybook/react-vite',
  addons: [],
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname, '../src'),
      '@components': resolve(__dirname, '../src/components'),
      '@pages': resolve(__dirname, '../src/pages'),
      '@context': resolve(__dirname, '../src/context'),
      '@hooks': resolve(__dirname, '../src/hooks'),
      '@api': resolve(__dirname, '../src/api'),
      '@services': resolve(__dirname, '../src/services'),
      '@utils': resolve(__dirname, '../src/utils'),
      '@types': resolve(__dirname, '../src/types'),
      '@assets': resolve(__dirname, '../src/assets'),
    };
    return config;
  },
};

export default config;
