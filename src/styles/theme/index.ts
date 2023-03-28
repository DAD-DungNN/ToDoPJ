'use client';

import { ThemeConfig } from 'antd/es/config-provider/context';

import paletteOptions from './color';

export const customThemeOption: ThemeConfig = {
  token: {
    colorPrimary: paletteOptions.primary,
  },
  hashed: false,
  components: {
    Input: {
      controlHeight: 46,
      controlOutline: 'white',
    },
    Button: {
      controlHeight: 46,
    },
  },
};
