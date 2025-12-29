import React from 'react';
import {
  Stack,
  Text,
  PrimaryButton,
  DefaultButton,
  IconButton,
  Checkbox,
  Dropdown,
  TextField,
  Toggle,
  DatePicker,
  Slider,
  ProgressIndicator,
  MessageBar,
  MessageBarType,
  Panel,
  Dialog,
  DialogFooter,
  CommandBar,
  DetailsList,
  Pivot,
  PivotItem,
  SearchBox,
  Breadcrumb,
  Link,
  Label,
  ChoiceGroup,
  Spinner,
  TooltipHost,
  TeachingBubble,
} from '@fluentui/react';
import { Card } from '@fluentui/react-components';

// Resource Card Component
export const ResourceCard: React.FC<any> = ({ title, status, metrics, actions, ...props }) => {
  return (
    <Card style={{ padding: '16px', marginBottom: '16px', ...props.style }}>
      <Stack tokens={{ childrenGap: 12 }}>
        <Stack horizontal horizontalAlign="space-between">
          <Text variant="xLarge" style={{ fontWeight: 600 }}>{title}</Text>
          {status && (
            <Text variant="medium" style={{ 
              color: status === 'Running' ? '#107C10' : status === 'Stopped' ? '#D13438' : '#605E5C'
            }}>
              {status}
            </Text>
          )}
        </Stack>
        
        {metrics && metrics.length > 0 && (
          <Stack horizontal tokens={{ childrenGap: 24 }}>
            {metrics.map((metric: any, idx: number) => (
              <Stack key={idx} tokens={{ childrenGap: 4 }}>
                <Text variant="small" style={{ color: '#605E5C' }}>{metric.label}</Text>
                <Text variant="large" style={{ fontWeight: 600 }}>{metric.value}</Text>
              </Stack>
            ))}
          </Stack>
        )}
        
        {actions && actions.length > 0 && (
          <Stack horizontal tokens={{ childrenGap: 8 }}>
            {actions.map((action: string, idx: number) => (
              <DefaultButton key={idx} text={action} />
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

// Blade Header Component
export const BladeHeader: React.FC<any> = ({ title, subtitle, onClose, ...props }) => {
  return (
    <Stack
      horizontal
      horizontalAlign="space-between"
      verticalAlign="center"
      style={{
        padding: '12px 24px',
        borderBottom: '1px solid #EDEBE9',
        backgroundColor: '#FFFFFF',
        ...props.style
      }}
    >
      <Stack tokens={{ childrenGap: 4 }}>
        <Text variant="xLarge" style={{ fontWeight: 600 }}>{title}</Text>
        {subtitle && <Text variant="medium" style={{ color: '#605E5C' }}>{subtitle}</Text>}
      </Stack>
      {onClose && (
        <IconButton
          iconProps={{ iconName: 'ChromeClose' }}
          onClick={onClose}
          title="Close"
        />
      )}
    </Stack>
  );
};

// Essentials Component (Key-Value pairs for Azure resources)
export const Essentials: React.FC<any> = ({ items, ...props }) => {
  return (
    <Stack
      tokens={{ childrenGap: 16 }}
      style={{
        padding: '16px',
        backgroundColor: '#F3F2F1',
        borderRadius: '2px',
        ...props.style
      }}
    >
      {items && items.map((item: any, idx: number) => (
        <Stack key={idx} horizontal tokens={{ childrenGap: 8 }}>
          <Text variant="medium" style={{ color: '#605E5C', minWidth: '150px' }}>{item.label}:</Text>
          <Text variant="medium" style={{ fontWeight: 600 }}>{item.value}</Text>
        </Stack>
      ))}
    </Stack>
  );
};

// Section Control Component
export const SectionControl: React.FC<any> = ({ title, children, collapsible, defaultCollapsed, ...props }) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed || false);
  
  return (
    <Stack tokens={{ childrenGap: 12 }} style={{ marginBottom: '24px', ...props.style }}>
      <Stack
        horizontal
        horizontalAlign="space-between"
        verticalAlign="center"
        onClick={() => collapsible && setCollapsed(!collapsed)}
        style={{ cursor: collapsible ? 'pointer' : 'default' }}
      >
        <Text variant="large" style={{ fontWeight: 600 }}>{title}</Text>
        {collapsible && (
          <IconButton
            iconProps={{ iconName: collapsed ? 'ChevronDown' : 'ChevronUp' }}
          />
        )}
      </Stack>
      {!collapsed && <div>{children}</div>}
    </Stack>
  );
};

// Copyable Label Component
export const CopyableLabel: React.FC<any> = ({ label, value, ...props }) => {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }} style={props.style}>
      <Label>{label}</Label>
      <Text>{value}</Text>
      <IconButton
        iconProps={{ iconName: copied ? 'CheckMark' : 'Copy' }}
        onClick={handleCopy}
        title={copied ? 'Copied!' : 'Copy to clipboard'}
      />
    </Stack>
  );
};

// Metric Card Component
export const MetricCard: React.FC<any> = ({ title, value, trend, icon, ...props }) => {
  return (
    <Card style={{ padding: '16px', minWidth: '200px', ...props.style }}>
      <Stack tokens={{ childrenGap: 8 }}>
        <Stack horizontal horizontalAlign="space-between">
          <Text variant="medium" style={{ color: '#605E5C' }}>{title}</Text>
          {icon && <IconButton iconProps={{ iconName: icon }} />}
        </Stack>
        <Text variant="xxLarge" style={{ fontWeight: 600 }}>{value}</Text>
        {trend && (
          <Text
            variant="small"
            style={{ color: trend > 0 ? '#107C10' : trend < 0 ? '#D13438' : '#605E5C' }}
          >
            {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'} {Math.abs(trend)}%
          </Text>
        )}
      </Stack>
    </Card>
  );
};

// Info Box / Message Bar wrapper
export const InfoBox: React.FC<any> = ({ type, message, ...props }) => {
  const messageTypeMap: Record<string, MessageBarType> = {
    info: MessageBarType.info,
    warning: MessageBarType.warning,
    error: MessageBarType.error,
    success: MessageBarType.success,
  };
  const messageType = messageTypeMap[type] || MessageBarType.info;
  
  return <MessageBar messageBarType={messageType} {...props}>{message}</MessageBar>;
};

// Status Bar Component
export const StatusBar: React.FC<any> = ({ status, message, ...props }) => {
  const colorMap: Record<string, string> = {
    success: '#107C10',
    warning: '#F7630C',
    error: '#D13438',
    info: '#0078D4',
  };
  const color = colorMap[status] || '#605E5C';
  
  return (
    <Stack
      horizontal
      verticalAlign="center"
      tokens={{ childrenGap: 8 }}
      style={{
        padding: '8px 16px',
        backgroundColor: `${color}10`,
        borderLeft: `4px solid ${color}`,
        ...props.style
      }}
    >
      <IconButton
        iconProps={{
          iconName: status === 'success' ? 'CheckMark' : status === 'error' ? 'ErrorBadge' : 'Info'
        }}
        style={{ color }}
      />
      <Text style={{ color }}>{message}</Text>
    </Stack>
  );
};

// Pill Filters Component
export const PillFilters: React.FC<any> = ({ filters, selected, onFilterChange, ...props }) => {
  return (
    <Stack horizontal tokens={{ childrenGap: 8 }} style={props.style}>
      {filters && filters.map((filter: string, idx: number) => (
        <DefaultButton
          key={idx}
          text={filter}
          primary={selected === filter}
          onClick={() => onFilterChange && onFilterChange(filter)}
          style={{
            borderRadius: '16px',
            minWidth: 'auto',
            padding: '4px 16px',
          }}
        />
      ))}
    </Stack>
  );
};

// Export all Fluent UI components directly
export {
  Stack,
  Text,
  PrimaryButton,
  DefaultButton,
  IconButton,
  Checkbox,
  Dropdown,
  TextField,
  Toggle,
  DatePicker,
  Slider,
  ProgressIndicator,
  MessageBar,
  Panel,
  Dialog,
  DialogFooter,
  CommandBar,
  DetailsList,
  Pivot,
  PivotItem,
  SearchBox,
  Breadcrumb,
  Link,
  Label,
  ChoiceGroup,
  Spinner,
  TooltipHost,
  TeachingBubble,
  Card,
};
