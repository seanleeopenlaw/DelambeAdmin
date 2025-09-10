import type { Preview } from '@storybook/nextjs'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
      expanded: true,
      hideNoControlsWarning: true,
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0a0a0a',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
    layout: 'fullscreen',
    viewport: {
      viewports: {
        responsive: {
          name: 'Responsive',
          styles: {
            width: '100%',
            height: 'auto',
            minHeight: '100vh',
          },
        },
      },
      defaultViewport: 'responsive',
    },
    options: {
      panelPosition: 'bottom',
      showPanel: true,
    },
  },
};

export default preview;