import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  "stories": [
    "../src/components/design-system/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/components/ui/**/*.stories.@(js|jsx|mjs|ts|tsx)", 
    "../src/**/*.mdx"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-controls", 
    "@storybook/addon-a11y",
    "@storybook/addon-design-tokens",
    "@storybook/addon-figma",
    "@storybook/addon-viewport"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  "staticDirs": [
    "../public"
  ],
  "features": {
    "buildStoriesJson": true
  },
  "docs": {
    "autodocs": "tag"
  }
};
export default config;