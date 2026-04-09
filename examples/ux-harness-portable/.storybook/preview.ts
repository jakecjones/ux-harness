import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'page',
      values: [
        { name: 'page', value: '#111827' },
        { name: 'default', value: '#1f2937' },
        { name: 'elevated', value: '#374151' },
      ],
    },
    options: {
      storySort: {
        order: [
          'Foundations',
          ['Colors', 'Typography', 'Icons', 'Spacing', 'Borders & Shadows'],
          'Components',
          ['Buttons', 'Inputs', 'Cards', 'Tabs', 'Badges', 'Skeleton Loaders'],
          'Widget Garage',
          ['Category Card', 'Metric Card', 'Trend Chart', 'Featured Card', 'Input Action Card', 'Install Card', 'Chat Card', 'Side Nav'],
          'Page Examples',
          ['Card Grid', 'Table Page', 'Detail Page', 'Workspace', 'Activity Timeline'],
        ],
      },
    },
  },
};

export default preview;
