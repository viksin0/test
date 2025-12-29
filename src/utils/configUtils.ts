import yaml from 'js-yaml';
import { PlaygroundConfig, ComponentConfig } from '../types';

// Parse JSON or YAML string to config
export const parseConfig = (input: string): PlaygroundConfig | null => {
  try {
    // Try JSON first
    return JSON.parse(input) as PlaygroundConfig;
  } catch (jsonError) {
    try {
      // Try YAML if JSON fails
      return yaml.load(input) as PlaygroundConfig;
    } catch (yamlError) {
      console.error('Failed to parse config:', yamlError);
      return null;
    }
  }
};

// Stringify config to JSON
export const stringifyConfig = (config: PlaygroundConfig, pretty: boolean = true): string => {
  return JSON.stringify(config, null, pretty ? 2 : 0);
};

// Convert ComponentConfig to JSX string
export const componentToJSX = (config: ComponentConfig, indent: number = 0): string => {
  const indentStr = '  '.repeat(indent);
  const { component, children, ...props } = config;
  
  // Build props string
  const propsArray: string[] = [];
  Object.entries(props).forEach(([key, value]) => {
    if (value === undefined) return;
    
    if (typeof value === 'string') {
      propsArray.push(`${key}="${value}"`);
    } else if (typeof value === 'boolean') {
      propsArray.push(value ? key : `${key}={false}`);
    } else if (typeof value === 'number') {
      propsArray.push(`${key}={${value}}`);
    } else {
      propsArray.push(`${key}={${JSON.stringify(value)}}`);
    }
  });
  
  const propsStr = propsArray.length > 0 ? ' ' + propsArray.join(' ') : '';
  
  // Build JSX
  if (!children || children.length === 0) {
    return `${indentStr}<${component}${propsStr} />`;
  }
  
  const childrenJSX = children
    .map(child => componentToJSX(child, indent + 1))
    .join('\n');
    
  return `${indentStr}<${component}${propsStr}>\n${childrenJSX}\n${indentStr}</${component}>`;
};

// Convert full config to JSX
export const configToJSX = (config: PlaygroundConfig): string => {
  const imports = `import React from 'react';
import { Stack } from '@fluentui/react';
import * as AzureComponents from './components/AzureComponents';

export const GeneratedComponent: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
`;

  const components = config.layout.components
    .map(comp => componentToJSX(comp, 3))
    .join('\n');
    
  const closing = `    </div>
  );
};`;

  return `${imports}${components}\n${closing}`;
};

// Validate config structure
export const validateConfig = (config: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!config) {
    errors.push('Config is null or undefined');
    return { valid: false, errors };
  }
  
  if (!config.layout) {
    errors.push('Missing "layout" property');
  } else {
    if (!config.layout.type) {
      errors.push('Missing "layout.type" property');
    }
    if (!config.layout.components || !Array.isArray(config.layout.components)) {
      errors.push('Missing or invalid "layout.components" array');
    }
  }
  
  return { valid: errors.length === 0, errors };
};

// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};
