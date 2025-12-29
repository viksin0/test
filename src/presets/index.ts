import { ExportPreset } from '../types';

export const presets: ExportPreset[] = [
  {
    id: 'vm-overview',
    name: 'Virtual Machine Overview',
    description: 'Azure VM resource overview page with essentials, metrics, and actions',
    config: {
      name: 'VM Overview',
      description: 'Complete VM overview pattern',
      layout: {
        type: 'resource-overview',
        title: 'Virtual Machine Overview',
        components: [
          {
            component: 'BladeHeader',
            title: 'myvm-prod-001',
            subtitle: 'Virtual machine'
          },
          {
            component: 'Stack',
            tokens: { childrenGap: 24 },
            children: [
              {
                component: 'Essentials',
                items: [
                  { label: 'Resource group', value: 'rg-production' },
                  { label: 'Status', value: 'Running' },
                  { label: 'Location', value: 'East US' },
                  { label: 'Subscription', value: 'Production Subscription' },
                  { label: 'VM size', value: 'Standard_D2s_v3' },
                  { label: 'Operating system', value: 'Ubuntu 20.04 LTS' }
                ]
              },
              {
                component: 'SectionControl',
                title: 'Monitoring',
                children: [
                  {
                    component: 'Stack',
                    horizontal: true,
                    tokens: { childrenGap: 16 },
                    children: [
                      {
                        component: 'MetricCard',
                        title: 'CPU Usage',
                        value: '22%',
                        trend: -5,
                        icon: 'ProcessMetaTask'
                      },
                      {
                        component: 'MetricCard',
                        title: 'Memory Usage',
                        value: '67%',
                        trend: 3,
                        icon: 'Database'
                      },
                      {
                        component: 'MetricCard',
                        title: 'Network In',
                        value: '1.2 GB',
                        trend: 0,
                        icon: 'NetworkTower'
                      },
                      {
                        component: 'MetricCard',
                        title: 'Disk IOPS',
                        value: '450',
                        trend: -2,
                        icon: 'HardDrive'
                      }
                    ]
                  }
                ]
              },
              {
                component: 'CommandBar',
                items: [
                  { key: 'start', text: 'Start', iconProps: { iconName: 'Play' } },
                  { key: 'restart', text: 'Restart', iconProps: { iconName: 'Refresh' } },
                  { key: 'stop', text: 'Stop', iconProps: { iconName: 'Stop' } },
                  { key: 'delete', text: 'Delete', iconProps: { iconName: 'Delete' } }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    id: 'storage-account',
    name: 'Storage Account',
    description: 'Azure Storage Account resource page',
    config: {
      name: 'Storage Account',
      description: 'Storage account overview with containers and metrics',
      layout: {
        type: 'resource-overview',
        title: 'Storage Account',
        components: [
          {
            component: 'BladeHeader',
            title: 'mystorageaccount001',
            subtitle: 'Storage account'
          },
          {
            component: 'Stack',
            tokens: { childrenGap: 24 },
            children: [
              {
                component: 'Essentials',
                items: [
                  { label: 'Resource group', value: 'rg-storage' },
                  { label: 'Location', value: 'West US 2' },
                  { label: 'Performance', value: 'Standard' },
                  { label: 'Replication', value: 'LRS' },
                  { label: 'Account kind', value: 'StorageV2' }
                ]
              },
              {
                component: 'SectionControl',
                title: 'Quick Stats',
                children: [
                  {
                    component: 'Stack',
                    horizontal: true,
                    tokens: { childrenGap: 16 },
                    children: [
                      {
                        component: 'MetricCard',
                        title: 'Total Capacity',
                        value: '145 GB',
                        icon: 'CloudUpload'
                      },
                      {
                        component: 'MetricCard',
                        title: 'Blob Containers',
                        value: '12',
                        icon: 'FabricFolder'
                      },
                      {
                        component: 'MetricCard',
                        title: 'File Shares',
                        value: '3',
                        icon: 'Share'
                      }
                    ]
                  }
                ]
              },
              {
                component: 'CopyableLabel',
                label: 'Primary endpoint',
                value: 'https://mystorageaccount001.blob.core.windows.net/'
              }
            ]
          }
        ]
      }
    }
  },
  {
    id: 'dashboard',
    name: 'Dashboard Tiles',
    description: 'Azure Dashboard with multiple metric tiles',
    config: {
      name: 'Dashboard',
      description: 'Grid of dashboard tiles',
      layout: {
        type: 'dashboard',
        title: 'Dashboard',
        components: [
          {
            component: 'ResourceCard',
            title: 'Web App 1',
            status: 'Running',
            metrics: [
              { label: 'Requests', value: '1.2K' },
              { label: 'Avg Response', value: '120ms' }
            ],
            actions: ['Restart', 'Stop', 'Logs']
          },
          {
            component: 'ResourceCard',
            title: 'SQL Database',
            status: 'Running',
            metrics: [
              { label: 'DTU', value: '45%' },
              { label: 'Storage', value: '23 GB' }
            ],
            actions: ['Scale', 'Backup']
          },
          {
            component: 'ResourceCard',
            title: 'Redis Cache',
            status: 'Running',
            metrics: [
              { label: 'Cache Hits', value: '98.5%' },
              { label: 'Memory', value: '2.1 GB' }
            ],
            actions: ['Flush', 'Scale']
          },
          {
            component: 'MetricCard',
            title: 'Total Resources',
            value: '47',
            icon: 'AllApps'
          },
          {
            component: 'MetricCard',
            title: 'Monthly Cost',
            value: '$245',
            trend: 8,
            icon: 'Money'
          },
          {
            component: 'MetricCard',
            title: 'Alerts',
            value: '3',
            icon: 'Warning'
          }
        ]
      }
    }
  },
  {
    id: 'table-view',
    name: 'Table/List View',
    description: 'Data grid with Azure resources',
    config: {
      name: 'Table View',
      description: 'List of resources in a table',
      layout: {
        type: 'table',
        title: 'Resources',
        components: [
          {
            component: 'Stack',
            tokens: { childrenGap: 16 },
            children: [
              {
                component: 'Stack',
                horizontal: true,
                horizontalAlign: 'space-between',
                verticalAlign: 'center',
                children: [
                  {
                    component: 'Text',
                    variant: 'xLarge',
                    style: { fontWeight: 600 }
                  },
                  {
                    component: 'SearchBox',
                    placeholder: 'Search resources'
                  }
                ]
              },
              {
                component: 'PillFilters',
                filters: ['All', 'Running', 'Stopped', 'Failed'],
                selected: 'All'
              },
              {
                component: 'DetailsList',
                items: [
                  { name: 'vm-prod-001', type: 'Virtual Machine', status: 'Running', location: 'East US' },
                  { name: 'storage001', type: 'Storage Account', status: 'Running', location: 'West US' },
                  { name: 'sql-db-prod', type: 'SQL Database', status: 'Running', location: 'East US' },
                  { name: 'app-service-01', type: 'App Service', status: 'Running', location: 'Central US' }
                ],
                columns: [
                  { key: 'name', name: 'Name', fieldName: 'name', minWidth: 150 },
                  { key: 'type', name: 'Type', fieldName: 'type', minWidth: 150 },
                  { key: 'status', name: 'Status', fieldName: 'status', minWidth: 100 },
                  { key: 'location', name: 'Location', fieldName: 'location', minWidth: 100 }
                ],
                selectionMode: 0
              }
            ]
          }
        ]
      }
    }
  },
  {
    id: 'form',
    name: 'Resource Creation Form',
    description: 'Form for creating a new Azure resource',
    config: {
      name: 'Create Resource Form',
      description: 'Multi-step form for resource creation',
      layout: {
        type: 'form',
        title: 'Create Resource',
        components: [
          {
            component: 'BladeHeader',
            title: 'Create Virtual Machine',
            subtitle: 'Configure VM settings'
          },
          {
            component: 'Stack',
            tokens: { childrenGap: 20 },
            style: { padding: '24px' },
            children: [
              {
                component: 'SectionControl',
                title: 'Basics',
                children: [
                  {
                    component: 'Stack',
                    tokens: { childrenGap: 16 },
                    children: [
                      {
                        component: 'TextField',
                        label: 'Virtual machine name',
                        placeholder: 'Enter VM name',
                        required: true
                      },
                      {
                        component: 'Dropdown',
                        label: 'Region',
                        placeholder: 'Select region',
                        options: [
                          { key: 'eastus', text: 'East US' },
                          { key: 'westus', text: 'West US' },
                          { key: 'centralus', text: 'Central US' }
                        ]
                      },
                      {
                        component: 'Dropdown',
                        label: 'Size',
                        placeholder: 'Select VM size',
                        options: [
                          { key: 'b1s', text: 'B1s - 1 vCPU, 1 GB RAM' },
                          { key: 'd2sv3', text: 'D2s_v3 - 2 vCPUs, 8 GB RAM' },
                          { key: 'd4sv3', text: 'D4s_v3 - 4 vCPUs, 16 GB RAM' }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                component: 'SectionControl',
                title: 'Administrator Account',
                children: [
                  {
                    component: 'Stack',
                    tokens: { childrenGap: 16 },
                    children: [
                      {
                        component: 'TextField',
                        label: 'Username',
                        placeholder: 'Enter username'
                      },
                      {
                        component: 'PasswordBox',
                        label: 'Password',
                        placeholder: 'Enter password'
                      }
                    ]
                  }
                ]
              },
              {
                component: 'SectionControl',
                title: 'Inbound Port Rules',
                children: [
                  {
                    component: 'Checkbox',
                    label: 'Allow SSH (22)'
                  },
                  {
                    component: 'Checkbox',
                    label: 'Allow HTTP (80)'
                  },
                  {
                    component: 'Checkbox',
                    label: 'Allow HTTPS (443)'
                  }
                ]
              },
              {
                component: 'Stack',
                horizontal: true,
                horizontalAlign: 'end',
                tokens: { childrenGap: 8 },
                children: [
                  {
                    component: 'DefaultButton',
                    text: 'Cancel'
                  },
                  {
                    component: 'PrimaryButton',
                    text: 'Review + Create'
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  {
    id: 'blade',
    name: 'Blade Navigation',
    description: 'Azure Portal blade with side navigation',
    config: {
      name: 'Blade Layout',
      description: 'Blade with navigation menu',
      layout: {
        type: 'blade',
        title: 'Settings Blade',
        components: [
          {
            component: 'Stack',
            horizontal: true,
            style: { height: '100%' },
            children: [
              {
                component: 'Stack',
                style: {
                  width: '200px',
                  borderRight: '1px solid #EDEBE9',
                  padding: '16px'
                },
                tokens: { childrenGap: 8 },
                children: [
                  {
                    component: 'DefaultButton',
                    text: 'Overview',
                    styles: { root: { textAlign: 'left', justifyContent: 'flex-start' } }
                  },
                  {
                    component: 'DefaultButton',
                    text: 'Networking',
                    styles: { root: { textAlign: 'left', justifyContent: 'flex-start' } }
                  },
                  {
                    component: 'DefaultButton',
                    text: 'Storage',
                    styles: { root: { textAlign: 'left', justifyContent: 'flex-start' } }
                  },
                  {
                    component: 'DefaultButton',
                    text: 'Security',
                    styles: { root: { textAlign: 'left', justifyContent: 'flex-start' } }
                  },
                  {
                    component: 'DefaultButton',
                    text: 'Monitoring',
                    styles: { root: { textAlign: 'left', justifyContent: 'flex-start' } }
                  }
                ]
              },
              {
                component: 'Stack',
                style: { flex: 1, padding: '24px' },
                tokens: { childrenGap: 24 },
                children: [
                  {
                    component: 'Text',
                    variant: 'xLarge',
                    style: { fontWeight: 600 }
                  },
                  {
                    component: 'InfoBox',
                    type: 'info',
                    message: 'This resource is currently running in the East US region.'
                  },
                  {
                    component: 'SectionControl',
                    title: 'General Settings',
                    children: [
                      {
                        component: 'Stack',
                        tokens: { childrenGap: 16 },
                        children: [
                          {
                            component: 'Toggle',
                            label: 'Enable monitoring',
                            defaultChecked: true
                          },
                          {
                            component: 'Toggle',
                            label: 'Auto-shutdown',
                            defaultChecked: false
                          },
                          {
                            component: 'Dropdown',
                            label: 'Backup frequency',
                            options: [
                              { key: 'daily', text: 'Daily' },
                              { key: 'weekly', text: 'Weekly' },
                              { key: 'monthly', text: 'Monthly' }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
];

export const getPresetById = (id: string): ExportPreset | undefined => {
  return presets.find(preset => preset.id === id);
};

export const getPresetNames = (): Array<{ key: string; text: string }> => {
  return presets.map(preset => ({
    key: preset.id,
    text: preset.name
  }));
};
