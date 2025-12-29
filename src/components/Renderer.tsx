import React from 'react';
import { ComponentConfig } from '../types';
import { getComponent } from '../registry/componentRegistry';

interface RendererProps {
  config: ComponentConfig;
}

export const ComponentRenderer: React.FC<RendererProps> = ({ config }) => {
  if (!config || !config.component) {
    return null;
  }

  const Component = getComponent(config.component);
  
  if (!Component) {
    return (
      <div style={{ 
        padding: '8px', 
        backgroundColor: '#FFF4CE', 
        border: '1px solid #FFAA44',
        borderRadius: '2px',
        margin: '4px 0'
      }}>
        ⚠️ Component "{config.component}" not found in registry
      </div>
    );
  }

  // Extract props and children from config
  const { component, children, ...restProps } = config;
  
  // Render children if they exist
  const renderedChildren = children && children.length > 0
    ? children.map((child, index) => (
        <ComponentRenderer key={index} config={child} />
      ))
    : null;

  try {
    return (
      <Component {...restProps}>
        {renderedChildren}
      </Component>
    );
  } catch (error) {
    return (
      <div style={{ 
        padding: '8px', 
        backgroundColor: '#FDE7E9', 
        border: '1px solid #D13438',
        borderRadius: '2px',
        margin: '4px 0'
      }}>
        ❌ Error rendering "{config.component}": {(error as Error).message}
      </div>
    );
  }
};

interface LayoutRendererProps {
  config: ComponentConfig[];
  layoutType?: string;
}

export const LayoutRenderer: React.FC<LayoutRendererProps> = ({ config, layoutType }) => {
  if (!config || !Array.isArray(config)) {
    return (
      <div style={{ padding: '24px', textAlign: 'center', color: '#605E5C' }}>
        No components to render
      </div>
    );
  }

  // Apply layout-specific styling
  const layoutStyles: React.CSSProperties = layoutType === 'dashboard' 
    ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }
    : { display: 'flex', flexDirection: 'column', gap: '16px' };

  return (
    <div style={layoutStyles}>
      {config.map((componentConfig, index) => (
        <ComponentRenderer key={index} config={componentConfig} />
      ))}
    </div>
  );
};
