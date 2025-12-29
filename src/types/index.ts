// Core component configuration types
export interface ComponentConfig {
  component: string;
  props?: Record<string, any>;
  children?: ComponentConfig[];
  [key: string]: any;
}

export interface LayoutConfig {
  type: 'blade' | 'resource-overview' | 'dashboard' | 'command-bar' | 'form' | 'table';
  title?: string;
  components: ComponentConfig[];
}

export interface PlaygroundConfig {
  name: string;
  description?: string;
  layout: LayoutConfig;
}

// Azure Portal component types
export type AzureComponentType =
  | 'Accordion'
  | 'ArmErrorList'
  | 'BladeHeader'
  | 'Breadcrumb'
  | 'Button'
  | 'CallOut'
  | 'Checkbox'
  | 'ContextMenu'
  | 'ContextPane'
  | 'CopyableLabel'
  | 'DataGrid'
  | 'DatePicker'
  | 'Dialog'
  | 'Dropdown'
  | 'Essentials'
  | 'FileUpload'
  | 'Footer'
  | 'Hyperlink'
  | 'InfoBalloon'
  | 'InfoBox'
  | 'InlineMessage'
  | 'JSONEditor'
  | 'Label'
  | 'L1Nav'
  | 'L2Nav'
  | 'ListView'
  | 'NotificationToast'
  | 'Pager'
  | 'PasswordBox'
  | 'PillFilters'
  | 'PricingControl'
  | 'ProgressBar'
  | 'RadioButton'
  | 'ScrollBar'
  | 'SearchBox'
  | 'SectionControl'
  | 'SiteHeader'
  | 'Slider'
  | 'StatusBar'
  | 'Tab'
  | 'Tag'
  | 'TeachingBubble'
  | 'TextBox'
  | 'Toggle'
  | 'Toolbar'
  | 'TreeView'
  | 'Video'
  | 'ResourceCard'
  | 'MetricCard'
  | 'CommandBar'
  | 'Panel'
  | 'MessageBar'
  | 'Pivot'
  | 'DetailsList'
  | 'ChoiceGroup'
  | 'TextField'
  | 'PrimaryButton'
  | 'DefaultButton'
  | 'IconButton'
  | 'Spinner'
  | 'Stack'
  | 'Card';

// Component registry interface
export interface ComponentRegistry {
  [key: string]: React.ComponentType<any>;
}

// Export preset types
export interface ExportPreset {
  id: string;
  name: string;
  description: string;
  config: PlaygroundConfig;
}
