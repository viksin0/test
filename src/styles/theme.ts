import { createTheme, ITheme } from '@fluentui/react';

// Azure Portal color palette
export const azureColors = {
  // Primary colors
  themePrimary: '#0078D4',
  themeLighterAlt: '#F3F9FD',
  themeLighter: '#D0E7F8',
  themeLight: '#A9D3F2',
  themeTertiary: '#5CA9E5',
  themeSecondary: '#1A86D9',
  themeDarkAlt: '#006CBE',
  themeDark: '#005BA1',
  themeDarker: '#004377',
  
  // Neutral colors
  neutralLighterAlt: '#FAF9F8',
  neutralLighter: '#F3F2F1',
  neutralLight: '#EDEBE9',
  neutralQuaternaryAlt: '#E1DFDD',
  neutralQuaternary: '#D2D0CE',
  neutralTertiaryAlt: '#C8C6C4',
  neutralTertiary: '#A19F9D',
  neutralSecondary: '#605E5C',
  neutralSecondaryAlt: '#8A8886',
  neutralPrimaryAlt: '#3B3A39',
  neutralPrimary: '#323130',
  neutralDark: '#201F1E',
  black: '#000000',
  white: '#FFFFFF',
  
  // Status colors
  success: '#107C10',
  successBackground: '#DFF6DD',
  warning: '#F7630C',
  warningBackground: '#FFF4CE',
  error: '#D13438',
  errorBackground: '#FDE7E9',
  info: '#0078D4',
  infoBackground: '#F3F9FD',
};

// Azure Portal theme
export const azureTheme: ITheme = createTheme({
  palette: {
    themePrimary: azureColors.themePrimary,
    themeLighterAlt: azureColors.themeLighterAlt,
    themeLighter: azureColors.themeLighter,
    themeLight: azureColors.themeLight,
    themeTertiary: azureColors.themeTertiary,
    themeSecondary: azureColors.themeSecondary,
    themeDarkAlt: azureColors.themeDarkAlt,
    themeDark: azureColors.themeDark,
    themeDarker: azureColors.themeDarker,
    neutralLighterAlt: azureColors.neutralLighterAlt,
    neutralLighter: azureColors.neutralLighter,
    neutralLight: azureColors.neutralLight,
    neutralQuaternaryAlt: azureColors.neutralQuaternaryAlt,
    neutralQuaternary: azureColors.neutralQuaternary,
    neutralTertiaryAlt: azureColors.neutralTertiaryAlt,
    neutralTertiary: azureColors.neutralTertiary,
    neutralSecondary: azureColors.neutralSecondary,
    neutralSecondaryAlt: azureColors.neutralSecondaryAlt,
    neutralPrimaryAlt: azureColors.neutralPrimaryAlt,
    neutralPrimary: azureColors.neutralPrimary,
    neutralDark: azureColors.neutralDark,
    black: azureColors.black,
    white: azureColors.white,
  },
  fonts: {
    small: {
      fontSize: '11px',
    },
    medium: {
      fontSize: '13px',
    },
    large: {
      fontSize: '15px',
    },
    xLarge: {
      fontSize: '20px',
      fontWeight: 600,
    },
    xxLarge: {
      fontSize: '28px',
      fontWeight: 600,
    },
  },
  spacing: {
    s2: '4px',
    s1: '8px',
    m: '16px',
    l1: '20px',
    l2: '32px',
  },
});

// CSS variables for Azure design tokens
export const azureDesignTokens = `
  :root {
    --azure-primary: ${azureColors.themePrimary};
    --azure-primary-hover: ${azureColors.themeDark};
    --azure-neutral-light: ${azureColors.neutralLighter};
    --azure-neutral: ${azureColors.neutralSecondary};
    --azure-neutral-dark: ${azureColors.neutralDark};
    --azure-success: ${azureColors.success};
    --azure-warning: ${azureColors.warning};
    --azure-error: ${azureColors.error};
    --azure-info: ${azureColors.info};
    
    --azure-spacing-xs: 4px;
    --azure-spacing-s: 8px;
    --azure-spacing-m: 16px;
    --azure-spacing-l: 24px;
    --azure-spacing-xl: 32px;
    
    --azure-font-size-xs: 11px;
    --azure-font-size-s: 13px;
    --azure-font-size-m: 15px;
    --azure-font-size-l: 20px;
    --azure-font-size-xl: 28px;
    
    --azure-border-radius: 2px;
    --azure-border-width: 1px;
    --azure-border-color: ${azureColors.neutralLight};
  }
`;
