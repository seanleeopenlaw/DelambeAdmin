import { addons } from '@storybook/manager-api';

addons.setConfig({
  panelPosition: 'bottom',
  enableShortcuts: true,
  showPanel: true,
  selectedPanel: 'storybook/controls/panel',
  initialActive: 'canvas',
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});