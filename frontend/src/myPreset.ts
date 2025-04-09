import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          50: '{violet.50}',
          100: '{violet.100}',
          200: '{violet.200}',
          300: '{violet.300}',
          400: '{violet.400}',
          500: '{violet.500}',
          600: '{violet.600}',
          700: '{violet.700}',
          800: '{violet.800}',
          900: '{violet.900}',
          950: '{violet.950}',
        },
        highlight: {
          background: '{purple.700}',
          focusBackground: '{zinc.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
        custom: {
          svgtext: '{stone.900}',
          cardcolor: '{surface.100}'
        },
      },
      dark: {
        primary: {
          50: '{indigo.50}',
          100: '{indigo.100}',
          200: '{indigo.200}',
          300: '{indigo.300}',
          400: '{indigo.400}',
          500: '{indigo.500}',
          600: '{indigo.600}',
          700: '{indigo.700}',
          800: '{indigo.800}',
          900: '{indigo.900}',
          950: '{indigo.950}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
        custom: {
          svgtext: '{stone.100}',
          cardcolor: '{surface.800}'
        },
      },
    },
  },
});