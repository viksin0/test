import React from 'react';
import * as AzureComponents from '../components/AzureComponents';
import { ComponentRegistry } from '../types';

// PasswordBox wrapper component
const PasswordBox: React.FC<any> = (props) => {
  return React.createElement(AzureComponents.TextField, { type: 'password', ...props });
};

// Create the component registry mapping
export const componentRegistry: ComponentRegistry = {
  // Custom Azure components
  'ResourceCard': AzureComponents.ResourceCard,
  'BladeHeader': AzureComponents.BladeHeader,
  'Essentials': AzureComponents.Essentials,
  'SectionControl': AzureComponents.SectionControl,
  'CopyableLabel': AzureComponents.CopyableLabel,
  'MetricCard': AzureComponents.MetricCard,
  'InfoBox': AzureComponents.InfoBox,
  'StatusBar': AzureComponents.StatusBar,
  'PillFilters': AzureComponents.PillFilters,
  
  // Fluent UI components - Basic
  'Stack': AzureComponents.Stack,
  'Text': AzureComponents.Text,
  'Label': AzureComponents.Label,
  'Link': AzureComponents.Link,
  'Hyperlink': AzureComponents.Link,
  
  // Buttons
  'Button': AzureComponents.DefaultButton,
  'PrimaryButton': AzureComponents.PrimaryButton,
  'DefaultButton': AzureComponents.DefaultButton,
  'IconButton': AzureComponents.IconButton,
  
  // Form Controls
  'TextField': AzureComponents.TextField,
  'TextBox': AzureComponents.TextField,
  'PasswordBox': PasswordBox,
  'Checkbox': AzureComponents.Checkbox,
  'Toggle': AzureComponents.Toggle,
  'Dropdown': AzureComponents.Dropdown,
  'ChoiceGroup': AzureComponents.ChoiceGroup,
  'RadioButton': AzureComponents.ChoiceGroup,
  'DatePicker': AzureComponents.DatePicker,
  'Slider': AzureComponents.Slider,
  'SearchBox': AzureComponents.SearchBox,
  
  // Navigation
  'Breadcrumb': AzureComponents.Breadcrumb,
  'Pivot': AzureComponents.Pivot,
  'Tab': AzureComponents.Pivot,
  
  // Feedback
  'MessageBar': AzureComponents.MessageBar,
  'InlineMessage': AzureComponents.MessageBar,
  'Dialog': AzureComponents.Dialog,
  'Panel': AzureComponents.Panel,
  'ContextPane': AzureComponents.Panel,
  'TeachingBubble': AzureComponents.TeachingBubble,
  'InfoBalloon': AzureComponents.TooltipHost,
  'CallOut': AzureComponents.TooltipHost,
  
  // Data Display
  'DetailsList': AzureComponents.DetailsList,
  'DataGrid': AzureComponents.DetailsList,
  'ListView': AzureComponents.DetailsList,
  
  // Actions
  'CommandBar': AzureComponents.CommandBar,
  'Toolbar': AzureComponents.CommandBar,
  
  // Progress
  'ProgressBar': AzureComponents.ProgressIndicator,
  'Spinner': AzureComponents.Spinner,
  
  // Layout
  'Card': AzureComponents.Card,
};

// Get component from registry
export const getComponent = (componentName: string): React.ComponentType<any> | null => {
  return componentRegistry[componentName] || null;
};

// Get all available component names
export const getAvailableComponents = (): string[] => {
  return Object.keys(componentRegistry).sort();
};
