# Azure Portal UI Playground

A declarative UI preview tool for Azure Portal UX patterns. Build and test Azure Portal-style interfaces using JSON/YAML configuration with live preview and JSX export capabilities.

![Azure Portal UI Playground](https://img.shields.io/badge/Azure-Portal-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black) ![Fluent UI](https://img.shields.io/badge/Fluent_UI-0078D4?logo=microsoft&logoColor=white)

## Overview

The Azure Portal UI Playground allows designers and developers to:
- **Design** Azure Portal interfaces using simple JSON/YAML configurations
- **Preview** components in real-time with live editing
- **Export** generated JSX code for production use
- **Explore** pre-built Azure Portal patterns and layouts

Built exclusively with Microsoft ecosystem tools:
- **React** + **TypeScript** for the application framework
- **Fluent UI** for Azure Portal-consistent components
- **Monaco Editor** (VS Code editor) for the configuration editor
- **Vite** for fast development and building

## Features

### 🎨 Live Configuration Editor
- Edit JSON or YAML configurations with syntax highlighting
- Real-time validation and error reporting
- Auto-complete support for component types
- Monaco Editor integration (same editor as VS Code)

### 👁️ Live Preview Panel
- Instant rendering of UI changes
- Split-pane layout for simultaneous editing and preview
- Multiple layout modes (Blade, Dashboard, Form, Table, etc.)

### 📦 50+ Azure Portal Components
Supports all major Azure Portal UI components:
- **Navigation**: Breadcrumb, L1/L2 Nav, Blade Header
- **Data Display**: DetailsList, DataGrid, Essentials, Metrics
- **Form Controls**: TextField, Dropdown, Toggle, DatePicker, Slider
- **Actions**: CommandBar, Buttons (Primary, Default, Icon)
- **Feedback**: MessageBar, Dialog, Panel, TeachingBubble
- **Layout**: Stack, Card, Section Control
- **Status**: Progress Bar, Status Bar, Spinner
- And many more...

### 🎯 Pre-built Layout Presets
6 ready-to-use Azure Portal patterns:
1. **Virtual Machine Overview** - Resource overview with metrics
2. **Storage Account** - Storage resource page with containers
3. **Dashboard Tiles** - Grid layout with metric cards
4. **Table/List View** - Data grid with filtering
5. **Resource Creation Form** - Multi-section form layout
6. **Blade Navigation** - Side navigation with settings

### 🚀 Export Functionality
- Export to JSX (copy to clipboard)
- Export to JSON (copy to clipboard)
- Generated code ready for production use
- Properly formatted with imports

### 🎨 Azure Design System
- Official Azure Portal color palette
- Microsoft design tokens for spacing, typography, shadows
- Fluent UI theming integration
- Consistent with portal.azure.com styling

## Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Modern web browser with ES2020 support

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
Once started, the playground will be available at `http://localhost:3000`

## Usage

### 1. Using Presets

The easiest way to get started is by loading one of the pre-built presets:

1. Click the **"Load Preset"** dropdown in the toolbar
2. Select a preset (e.g., "Virtual Machine Overview")
3. The configuration will load in the editor
4. See the live preview in the right panel

### 2. Editing Configurations

Modify the JSON configuration in the left editor pane. Changes are reflected immediately in the preview.

**Basic Example:**
```json
{
  "name": "My Resource",
  "layout": {
    "type": "resource-overview",
    "components": [
      {
        "component": "ResourceCard",
        "title": "Virtual Machine",
        "status": "Running",
        "metrics": [
          {"label": "CPU", "value": "22%"},
          {"label": "Memory", "value": "67%"}
        ],
        "actions": ["Start", "Stop", "Restart"]
      }
    ]
  }
}
```

### 3. Component Configuration Schema

All components follow this structure:
```json
{
  "component": "ComponentName",
  "prop1": "value1",
  "prop2": "value2",
  "children": [
    {
      "component": "ChildComponent",
      "prop": "value"
    }
  ]
}
```

### 4. Available Layout Types

- `blade` - Azure blade with side navigation
- `resource-overview` - Resource details page
- `dashboard` - Grid of tiles/cards
- `command-bar` - Toolbar with actions
- `form` - Multi-section form layout
- `table` - List view with data grid

### 5. Exporting Code

Once you're satisfied with your design:

1. Click **"Export JSX"** to copy React component code
2. Click **"Export JSON"** to copy the configuration
3. Paste into your project
4. Import required components from Fluent UI

## Component Reference

### Custom Azure Components

#### ResourceCard
Display resource summary with status and metrics.
```json
{
  "component": "ResourceCard",
  "title": "Virtual Machine",
  "status": "Running",
  "metrics": [
    {"label": "CPU", "value": "22%"}
  ],
  "actions": ["Start", "Stop"]
}
```

#### BladeHeader
Azure blade header with title and close button.
```json
{
  "component": "BladeHeader",
  "title": "Settings",
  "subtitle": "Configure your resource"
}
```

#### Essentials
Key-value pairs for resource properties.
```json
{
  "component": "Essentials",
  "items": [
    {"label": "Resource group", "value": "rg-production"},
    {"label": "Location", "value": "East US"}
  ]
}
```

#### SectionControl
Collapsible section with title.
```json
{
  "component": "SectionControl",
  "title": "General Settings",
  "collapsible": true,
  "children": [...]
}
```

#### MetricCard
Compact metric display with trend.
```json
{
  "component": "MetricCard",
  "title": "CPU Usage",
  "value": "22%",
  "trend": -5,
  "icon": "ProcessMetaTask"
}
```

#### CopyableLabel
Label with copy-to-clipboard button.
```json
{
  "component": "CopyableLabel",
  "label": "Connection String",
  "value": "Server=..."
}
```

### Fluent UI Components

Most Fluent UI components can be used directly:

- **Stack**: Layout container with spacing
- **TextField**: Text input field
- **Dropdown**: Select dropdown
- **Toggle**: On/off switch
- **Checkbox**: Checkbox input
- **DatePicker**: Date selection
- **CommandBar**: Action toolbar
- **DetailsList**: Data table/grid
- **MessageBar**: Info/warning/error banner
- **Panel**: Side panel
- **Dialog**: Modal dialog
- **Breadcrumb**: Navigation breadcrumb
- **Pivot**: Tab navigation

See Fluent UI documentation for detailed props: https://developer.microsoft.com/en-us/fluentui

## Architecture

```
src/
├── components/          # React components
│   ├── AzureComponents.tsx   # Custom Azure Portal components
│   └── Renderer.tsx          # Dynamic component renderer
├── registry/            # Component registry
│   └── componentRegistry.ts  # Maps names to components
├── presets/             # Example configurations
│   └── index.ts             # All preset definitions
├── types/               # TypeScript types
│   └── index.ts             # Component and config types
├── utils/               # Utility functions
│   └── configUtils.ts       # Parsing, validation, export
├── styles/              # Theming
│   └── theme.ts             # Azure Portal theme
├── App.tsx              # Main application
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Adding New Components

To add a custom component to the playground:

1. **Create the component** in `src/components/AzureComponents.tsx`:
```tsx
export const MyComponent: React.FC<any> = ({ prop1, prop2 }) => {
  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};
```

2. **Register the component** in `src/registry/componentRegistry.ts`:
```tsx
export const componentRegistry: ComponentRegistry = {
  // ... existing components
  'MyComponent': AzureComponents.MyComponent,
};
```

3. **Use in configuration**:
```json
{
  "component": "MyComponent",
  "prop1": "value1",
  "prop2": "value2"
}
```

## Adding New Presets

To add a new preset configuration:

1. Open `src/presets/index.ts`
2. Add a new preset object to the `presets` array:
```typescript
{
  id: 'my-preset',
  name: 'My Custom Preset',
  description: 'Description of the preset',
  config: {
    name: 'Preset Name',
    layout: {
      type: 'resource-overview',
      components: [
        // Your component configurations
      ]
    }
  }
}
```

## Technology Stack

- **React 18** - UI framework
- **TypeScript 5** - Type-safe JavaScript
- **Fluent UI 8 & 9** - Microsoft's design system
- **Monaco Editor** - VS Code editor component
- **Vite 5** - Build tool and dev server
- **js-yaml** - YAML parsing support

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## References

This playground is built using official Microsoft ecosystem libraries:

- **Fluent UI**: https://github.com/microsoft/fluentui
- **Azure Communication UI**: https://github.com/Azure/communication-ui-library
- **Azure IoT Fluent Controls**: https://github.com/Azure/iot-ux-fluent-controls
- **Azure Samples**: https://github.com/Azure-Samples

## Contributing

Contributions are welcome! When adding components:

1. Use only Microsoft ecosystem libraries (Fluent UI, Azure libraries)
2. Follow Azure Portal design patterns
3. Match visual styling from portal.azure.com
4. Add TypeScript types for all props
5. Update component registry and documentation

## License

MIT

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Built with ❤️ using Microsoft Fluent UI and Azure design patterns**
